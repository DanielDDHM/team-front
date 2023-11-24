import React, { Component } from "react";
import { connect } from "react-redux";
import { Sidebar, Header, ErrorBoundary, Footer } from "screens";
import { Content, RouteContent, Loader } from "components";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Routes from "./routes";
// import { getFirebaseToken } from '../../firebase';
import { setFirebaseNotifications, setNotificationToken } from 'store/actions';
import { Modal } from "antd";
import strings from "utils/strings";

// @ts-ignore
import Variables from 'styles/variables.scss';
import 'styles/styles.scss';
import 'styles/theme.less';
import logo from 'assets/images/logo_small_team@1x.png';

let theme: any;

export class App extends Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			sidebarOpen: false,
			sidebarHidden: false,
			showNotificationModal: false,
		};

		theme = createTheme({
			palette: {
				primary: {
					main: Variables.primaryColor,
				},
			},
		});
	}

	UNSAFE_componentWillMount() {
		strings.setLanguage(this.props.language || 'pt');
	}

	async componentDidUpdate(prevProps: any) {
		const { dispatch, router, notificationToken, user, firebaseNotifications } = this.props;
		if (router?.location?.pathname !== prevProps.router?.location?.pathname) {
			window.scroll({ top: 0 });

			if (Notification.permission === 'default' && firebaseNotifications && user) {
				this.setState({ showNotificationModal: true });
			}
		}

		if (Notification.permission === 'denied') {
			dispatch(setNotificationToken(''));
		} else if (Notification.permission === 'granted' && !notificationToken && user) {
			// const notificationToken = await getFirebaseToken();

			dispatch(setNotificationToken(notificationToken));
			// api call
		}
	}

	openSidebar() {
		this.setState({ sidebarOpen: true });
	}

	closeSidebar() {
		if (document.body.clientWidth < 992) {
			this.setState({ sidebarHidden: true, sidebarOpen: false });
		} else {
			this.setState({ sidebarOpen: false });
		}
	}

	renderNotificationModal() {
		const { showNotificationModal } = this.state;
		const { dispatch } = this.props;

		return (
			<Modal
				centered={true}
				closable={false}
				visible={showNotificationModal}
				footer={null}
				width={500}
			>
				<div className="ModalNotificationContainer">
					<div className="ModalNotificationHeader">
						<div className="ModalNotificationLogo">
							<img src={logo} alt="logo" />
						</div>
						<span
							className="ModalNotificationTitle">
							{strings.generic.receiveNotificationsDescription}
						</span>
					</div>
					<div className="ModalNotificationButtons">
						<span
							onClick={() => {
								this.setState({ showNotificationModal: false });
								dispatch(setFirebaseNotifications(false))
							}}>
							{strings.generic.noThankYou}
						</span>
						<button
							onClick={() => {
								this.setState({ showNotificationModal: false });
								dispatch(setFirebaseNotifications(false));

								// getFirebaseToken();
							}}
							className="ModalNotificationClose"
						>
							{strings.generic.permit}
						</button>
					</div>
				</div>
			</Modal>
		);
	}

	render() {
		const { user } = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				<div className="AppWrapper">
					{Boolean(user) && (<Sidebar />)}
					<Content>
						{Boolean(user) && (<Header />)}
						<RouteContent>
							<ErrorBoundary>
								<Routes />
							</ErrorBoundary>
						</RouteContent>
					</Content>
				</div>
				<Footer />
				<Loader />
				{this.renderNotificationModal()}
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = (state: any) => ({
	router: state.router,
	loader: state.loader,
	language: state.language,
	user: state.user,
	notificationToken: state.notificationToken,
	firebaseNotifications: state.firebaseNotifications,
});

export default connect(mapStateToProps)(App);
