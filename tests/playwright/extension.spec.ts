import { chromium, expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const extensionPath = path.join(__dirname, '../../build');

async function launchWithExtension(headless = false) {
	const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pw-chrome-'));
	return await chromium.launchPersistentContext(userDataDir, {
		headless,
		args: [
			`--disable-extensions-except=${extensionPath}`,
			`--load-extension=${extensionPath}`,
		],
	});
}

async function getExtensionId(context: any) {
	for (let i = 0; i < 20; i++) {
		const [worker] = context.serviceWorkers();
		if (worker) return worker.url().split('/')[2];
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error('Service worker not found');
}

test('loads options page', async () => {
	const context = await launchWithExtension();
	const extensionId = await getExtensionId(context);
	const page = await context.newPage();
	await page.goto(`chrome-extension://${extensionId}/options.html`);
	await expect(page.locator('h3.text-center')).toHaveText(
		'News Feed Eradicator'
	);
	await fs.mkdir('test-results', { recursive: true });
	await page.screenshot({
		path: path.join('test-results', 'options-page.png'),
	});
	await context.close();
});

test('blocks Reddit feed (may be flaky in CI)', async () => {
	const context = await launchWithExtension();
	const extensionId = await getExtensionId(context);

	// Navigate to options page and enable Reddit
	console.log('Enabling Reddit via options page...');
	const optionsPage = await context.newPage();
	await optionsPage.goto(`chrome-extension://${extensionId}/options.html`);

	// Wait for the page to load
	await optionsPage.waitForSelector('h3.text-center', { timeout: 5000 });

	// Find and click the Reddit checkbox
	console.log('Looking for Reddit checkbox...');
	const redditCheckbox = optionsPage.locator('input[id="reddit"]');
	await redditCheckbox.waitFor({ timeout: 5000 });

	// Check if it's already checked
	const isChecked = await redditCheckbox.isChecked();
	console.log(`Reddit checkbox checked: ${isChecked}`);

	if (!isChecked) {
		await redditCheckbox.click();
		console.log('Clicked Reddit checkbox to enable');
		// Wait for the state to save and content scripts to re-register
		await optionsPage.waitForTimeout(2000);
	}

	// Close options page
	await optionsPage.close();

	// IMPORTANT: Load Reddit AFTER enabling the site
	// Content scripts only inject into pages loaded after registration
	console.log('Loading Reddit (after enabling)...');
	const page = await context.newPage();

	// Go to Reddit
	await page.goto('https://www.reddit.com/', {
		waitUntil: 'domcontentloaded',
		timeout: 30000,
	});

	console.log('Reddit loaded!');

	// Wait for extension to inject (runs every 1000ms)
	console.log('Waiting 5 seconds for extension injection...');
	await page.waitForTimeout(5000);

	// Take screenshot
	await fs.mkdir('test-results', { recursive: true });
	await page.screenshot({
		path: path.join('test-results', 'reddit-blocked.png'),
		fullPage: true,
	});

	// Check if nfe-container exists
	const nfeExists = await page.locator('#nfe-container').count();
	console.log(`nfe-container found: ${nfeExists} times`);

	if (nfeExists > 0) {
		console.log('✓ SUCCESS: Extension injected the NFE container!');
		await expect(page.locator('#nfe-container')).toBeVisible();
	} else {
		console.log(
			'⚠ WARNING: NFE container not found - Reddit may be blocked in CI'
		);
		// Don't fail - Reddit might block CI IPs or behave differently
		await page.screenshot({
			path: path.join('test-results', 'reddit-failed.png'),
			fullPage: true,
		});
	}

	await context.close();
});

test('blocks Hacker News feed', async () => {
	const context = await launchWithExtension();
	const extensionId = await getExtensionId(context);

	// Navigate to options page and enable Hacker News
	console.log('Enabling Hacker News via options page...');
	const optionsPage = await context.newPage();
	await optionsPage.goto(`chrome-extension://${extensionId}/options.html`);

	// Wait for the page to load
	await optionsPage.waitForSelector('h3.text-center', { timeout: 5000 });

	// Find and click the Hacker News checkbox
	console.log('Looking for HN checkbox...');
	const hnCheckbox = optionsPage.locator('input[id="hackernews"]');
	await hnCheckbox.waitFor({ timeout: 5000 });

	// Check if it's already checked
	const isChecked = await hnCheckbox.isChecked();
	console.log(`HN checkbox checked: ${isChecked}`);

	if (!isChecked) {
		await hnCheckbox.click();
		console.log('Clicked HN checkbox to enable');
		// Wait for the state to save and content scripts to re-register
		await optionsPage.waitForTimeout(2000);
	}

	// Close options page
	await optionsPage.close();

	// IMPORTANT: Load HN AFTER enabling the site
	// Content scripts only inject into pages loaded after registration
	console.log('Loading Hacker News (after enabling)...');
	const page = await context.newPage();

	// Go to Hacker News
	await page.goto('https://news.ycombinator.com/', {
		waitUntil: 'domcontentloaded',
		timeout: 30000,
	});

	console.log('Hacker News loaded!');

	// Wait for extension to inject (runs every 1000ms)
	console.log('Waiting 5 seconds for extension injection...');
	await page.waitForTimeout(5000);

	// Take screenshot
	await fs.mkdir('test-results', { recursive: true });
	await page.screenshot({
		path: path.join('test-results', 'hn-blocked.png'),
		fullPage: true,
	});

	// Check if nfe-container exists
	const nfeExists = await page.locator('#nfe-container').count();
	console.log(`nfe-container found: ${nfeExists} times`);

	if (nfeExists > 0) {
		console.log('✓ SUCCESS: Extension injected the NFE container on HN!');
		await expect(page.locator('#nfe-container')).toBeVisible();
	} else {
		console.log('✗ FAIL: NFE container not found on HN');
		// Take a screenshot of what we got instead
		await page.screenshot({
			path: path.join('test-results', 'hn-failed.png'),
			fullPage: true,
		});
		throw new Error(
			'Extension did not inject on HN - blocking may not be working'
		);
	}

	await context.close();
});

test('blocks Twitter/X feed (may fail - requires auth)', async () => {
	const context = await launchWithExtension();
	const extensionId = await getExtensionId(context);

	// Navigate to options page and enable Twitter
	console.log('Enabling Twitter via options page...');
	const optionsPage = await context.newPage();
	await optionsPage.goto(`chrome-extension://${extensionId}/options.html`);
	await optionsPage.waitForSelector('h3.text-center', { timeout: 5000 });

	const twitterCheckbox = optionsPage.locator('input[id="twitter"]');
	await twitterCheckbox.waitFor({ timeout: 5000 });

	const isChecked = await twitterCheckbox.isChecked();
	console.log(`Twitter checkbox checked: ${isChecked}`);

	if (!isChecked) {
		await twitterCheckbox.click();
		console.log('Clicked Twitter checkbox to enable');
		await optionsPage.waitForTimeout(2000);
	}

	await optionsPage.close();

	console.log('Loading Twitter (after enabling)...');
	const page = await context.newPage();

	// Go to Twitter/X
	await page.goto('https://x.com/', {
		waitUntil: 'domcontentloaded',
		timeout: 30000,
	});

	console.log('Twitter loaded!');
	await page.waitForTimeout(5000);

	// Take screenshot regardless of success
	await fs.mkdir('test-results', { recursive: true });
	await page.screenshot({
		path: path.join('test-results', 'twitter-blocked.png'),
		fullPage: true,
	});

	// Check if nfe-container exists
	const nfeExists = await page.locator('#nfe-container').count();
	console.log(`nfe-container found: ${nfeExists} times`);

	// Twitter will likely show login page, so we just warn instead of failing
	if (nfeExists > 0) {
		console.log('✓ SUCCESS: Extension injected on Twitter!');
		await expect(page.locator('#nfe-container')).toBeVisible();
	} else {
		console.log(
			'⚠ WARNING: NFE container not found - Twitter may require authentication'
		);
		// Don't throw error, just log warning
	}

	await context.close();
});
