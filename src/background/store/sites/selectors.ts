import { SettingsState } from '../reducer';
import { SiteId, Sites, Site } from '../../../sites';
import { SettingsSiteStateTag } from '../index';

type SettingsHealth = {
	noSitesEnabled: boolean;
	sitesNeedingPermissions: number;
};

export enum SiteStatusTag {
	ENABLED,
	NEEDS_NEW_PERMISSIONS,
	DISABLED,
	DISABLED_TEMPORARILY,
}

export type SiteStatus =
	| { type: SiteStatusTag.ENABLED }
	| { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS }
	| { type: SiteStatusTag.DISABLED }
	| { type: SiteStatusTag.DISABLED_TEMPORARILY; until: number };

export function getSettingsHealth(state: SettingsState): SettingsHealth {
	let atLeastOneSiteEnabled = false;
	let sitesNeedingPermissions = 0;
	const siteStatus = getSiteStatus(state);

	Object.keys(siteStatus).forEach((id) => {
		const s: SiteStatus = siteStatus[id];
		if (
			s.type === SiteStatusTag.NEEDS_NEW_PERMISSIONS ||
			s.type === SiteStatusTag.DISABLED_TEMPORARILY ||
			s.type === SiteStatusTag.ENABLED
		) {
			atLeastOneSiteEnabled = true;
		}
		if (s.type === SiteStatusTag.NEEDS_NEW_PERMISSIONS) {
			sitesNeedingPermissions += 1;
		}
	});

	return {
		noSitesEnabled: !atLeastOneSiteEnabled,
		sitesNeedingPermissions,
	};
}

export function recordMap<Key extends string, ValFrom, ValTo>(
	record: Record<Key, ValFrom>,
	mapper: (key: string, val: ValFrom) => ValTo
): Record<Key, ValTo> {
	const out: Record<Key, ValTo> = {} as Record<Key, ValTo>;
	for (const key of Object.keys(record)) {
		out[key as Key] = mapper(key, record[key]);
	}
	return out;
}

/*
 * Combines the explicit user settings with the granted permissions to work
 * out whether anything needs updating
 */
export function getSiteStatus(
	state: SettingsState
): Record<SiteId, SiteStatus> {
	const mapped = recordMap(state.sites, (key, siteState) => {
		if (siteState.type === SettingsSiteStateTag.DISABLED) {
			return { type: SiteStatusTag.DISABLED };
		}

		// How many origins do we have permission for?
		const site: Site = Sites[key];
		const { origins } = state.permissions;
		const grantedOrigins = site.origins.filter(
			(origin) => origins.indexOf(origin) !== -1
		);

		switch (siteState.type) {
			case SettingsSiteStateTag.ENABLED:
				// Explicitly enabled - make sure permissions are there
				if (grantedOrigins.length === site.origins.length) {
					return { type: SiteStatusTag.ENABLED };
				}
				return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };

			case SettingsSiteStateTag.CHECK_PERMISSIONS:
				// Not explicitly set, check the permissions instead to determine if enabled
				if (grantedOrigins.length === site.origins.length) {
					return { type: SiteStatusTag.ENABLED };
				} else if (grantedOrigins.length > 0) {
					return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
				}
				return { type: SiteStatusTag.DISABLED };
			case SettingsSiteStateTag.DISABLED_TEMPORARILY:
				// Disable temporarily only - make sure permissions are there
				if (grantedOrigins.length === site.origins.length) {
					if (siteState.disabled_until > Date.now()) {
						return {
							type: SiteStatusTag.DISABLED_TEMPORARILY,
							until: siteState.disabled_until,
						};
					} else {
						return { type: SiteStatusTag.ENABLED };
					}
				}
				return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
		}
	});

	// Filter out undefined values to match the expected return type
	const filtered: Record<SiteId, SiteStatus> = {} as Record<SiteId, SiteStatus>;
	for (const key in mapped) {
		if (mapped[key] !== undefined) {
			filtered[key as SiteId] = mapped[key]!;
		}
	}
	return filtered;
}
