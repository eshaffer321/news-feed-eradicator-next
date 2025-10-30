import { CustomQuote } from '../../quote';
import { getBrowser } from '../../webextension';
import { SiteId, Sites } from '../../sites';

export type SettingsV1 = {
	version: 1;
	showQuotes: boolean;
	builtinQuotesEnabled: boolean;
	featureIncrement: number;
	hiddenBuiltinQuotes: number[];
	customQuotes: CustomQuote[];
	sites: Partial<SettingsSitesState>;
};

export type SettingsSitesState = Record<SiteId, SettingsSiteState>;

export enum SettingsSiteStateTag {
	ENABLED = 'enabled',
	CHECK_PERMISSIONS = 'check_permissions',
	DISABLED = 'disabled',
	DISABLED_TEMPORARILY = 'disabled_temporarily',
}

export const defaultSites = (): SettingsSitesState => {
	const sites: SettingsSitesState = {} as SettingsSitesState;
	for (const siteId of Object.keys(Sites)) {
		sites[siteId] = { type: SettingsSiteStateTag.CHECK_PERMISSIONS };
	}
	return sites;
};

const defaults: SettingsV1 = {
	version: 1,
	showQuotes: true,
	builtinQuotesEnabled: true,
	featureIncrement: 0,
	hiddenBuiltinQuotes: [],
	customQuotes: [],
	sites: {},
};

export type SettingsSiteState =
	| { type: SettingsSiteStateTag.ENABLED }
	| { type: SettingsSiteStateTag.DISABLED }
	| { type: SettingsSiteStateTag.CHECK_PERMISSIONS }
	| { type: SettingsSiteStateTag.DISABLED_TEMPORARILY; disabled_until: number };

export type SettingsT = SettingsV1;

export async function loadSettings(): Promise<SettingsT> {
	return getBrowser()
		.storage.sync.get(null)
		.then((settings: Partial<SettingsV1>) => {
			// Merge defaults with stored settings
			const merged = {
				...defaults,
				...settings,
			};
			// If sites is empty or undefined, initialize with default sites
			if (!merged.sites || Object.keys(merged.sites).length === 0) {
				merged.sites = defaultSites();
			}
			return merged;
		});
}

export async function saveSettings(settings: SettingsT) {
	return getBrowser().storage.sync.set({ ...defaults, ...settings });
}
