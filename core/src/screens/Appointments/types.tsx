import { store } from "store";

export interface Props {
	dispatch: typeof store.dispatch;
	language: string;
}

export interface State {
	appointments: Array<any>;
}