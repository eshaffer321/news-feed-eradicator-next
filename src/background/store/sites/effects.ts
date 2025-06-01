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

export const sitesEffect: BackgroundEffect = effectAll(checkPermissions);
