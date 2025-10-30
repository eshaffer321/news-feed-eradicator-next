import { BackgroundEffect } from '../effects';
import { effectAll } from '../../../lib/redux-effects';
import { BackgroundActionType } from '../action-types';
import { getBrowser } from '../../../webextension';

export const getPermissions = async () => {
	return getBrowser().permissions.getAll();
};

const checkPermissions: BackgroundEffect = (store) => async (action) => {
	if (action.type === BackgroundActionType.PERMISSIONS_CHECK) {
		const permissions = await getPermissions();
		store.dispatch({
			type: BackgroundActionType.PERMISSIONS_UPDATE,
			permissions,
		});
	}
};

const reregisterOnSiteChange: BackgroundEffect = (store) => async (action) => {
	if (action.type === BackgroundActionType.SITES_SET_STATE) {
		// Re-register content scripts when a site is enabled/disabled
		store.dispatch({
			type: BackgroundActionType.CONTENT_SCRIPTS_REGISTER,
		});
	}
};

export const sitesEffect: BackgroundEffect = effectAll(
	checkPermissions,
	reregisterOnSiteChange
);
