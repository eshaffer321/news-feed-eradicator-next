import { chromium, expect, test } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

const extensionPath = path.join(__dirname, '../../build');

async function launchWithExtension() {
	const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pw-chrome-'));
	return await chromium.launchPersistentContext(userDataDir, {
		headless: false,
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
