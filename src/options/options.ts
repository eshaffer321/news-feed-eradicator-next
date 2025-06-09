import './options.css';
import App from './App.svelte';

export function start(container: HTMLElement | null) {
	if (container == null) {
		throw new Error('Root element not found');
	}

	new App({ target: container });
}

start(document.getElementById('app'));
