import { createBackgroundStore } from './store/store';
import { getBrowser } from '../webextension';

createBackgroundStore();

const browser = getBrowser();
browser.action.onClicked.addListener(() => {
	browser.runtime.openOptionsPage();
});
