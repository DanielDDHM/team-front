import * as TYPES from '../constants';
import { store } from 'store';
import { BreadcrumbType } from 'components/Breadcrumb';
import strings from 'utils/strings';

export const setLoader = (value: boolean) => ({ type: TYPES.SET_LOADER, value });
export const setTitle = (value: string) => ({ type: TYPES.SET_TITLE, value });
export const setUser = (value: object) => ({ type: TYPES.SET_USER, value });
export const setToken = (value: string) => ({ type: TYPES.SET_TOKEN, value });
export const setLogout = () => ({ type: TYPES.SET_LOGOUT });
export const setUpdater = (dispatch: any) => ({ type: TYPES.SET_UPDATER, dispatch });
export const setLanguage = (value: string) => {
	strings.setLanguage(value);
	return { type: TYPES.SET_LANGUAGE, value };
}
export const setNotificationToken = (value: string) => ({ type: TYPES.SET_NOTIFICATION_TOKEN, value });
export const setFirebaseNotifications = (value: boolean) => ({ type: TYPES.SET_FIREBASE_NOTIFICATIONS, value });
export const setBreadcrumb = (value: BreadcrumbType | null) => ({ type: TYPES.SET_BREADCRUMB, value });
export const updateCrumb = () => ({ type: TYPES.UPDATE_CRUMB });

export const delayedDispatch = (value: any, time = 400) => {
	setTimeout(() => store.dispatch(value), time);
}