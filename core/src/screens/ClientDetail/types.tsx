import { store } from "store";

export interface Props {
	dispatch: typeof store.dispatch;
	match: any;
	language: string;
}

export interface State {
	client: any | null;
	language: string;
	hasUnsavedFields: boolean;
}