import OptionsPage from './OptionsPage.svelte';
import './options.css';

export function start(container: HTMLElement | null) {
	if (container == null) {
		throw new Error('Root element not found');
	}

	new OptionsPage({ target: container });
}

start(document.getElementById('app'));
