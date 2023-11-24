import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Home, Login, RecoverPassword, Error500, Profile, ConfirmAccount } from 'screens';
import Appointments from 'screens/Appointments';
import Chat from 'screens/Chat';
import DefinePassword from 'screens/DefinePassword';

export const offlinePages = ['/login', '/register', '/accept-invite', '/recover-password', '/confirm'];

export class Routes extends React.Component<any, any> {
	shouldComponentUpdate(nextProps: any) {
		const { user, token } = this.props;
		const isLoggedIn = Boolean(user && token);
		const willBeLoggedIn = Boolean(nextProps.user && nextProps.token);

		return isLoggedIn !== willBeLoggedIn;
	}

	componentDidUpdate() {
		const elem = document.getElementById('app_content');

		if (elem) {
			elem.scrollTop = 0;
		}
	}

	render() {
		const { user } = this.props;

		if (user?.role === 'user') {
			return (
				<Switch>
					<Route exact path="/users/home" component={Home} />
					<Route exact path="/users/appointments" component={Appointments} />
					<Route exact path="/users/chat" component={Chat} />
					<Route exact path="/users/profile" component={Profile} />

					<Route exact path="/500" component={Error500} />
					<Redirect to="/users/home" />
				</Switch>
			);
		} else if (user?.role === 'psychologist') {
			return (
				<Switch>
					<Route exact path="/psychologists/home" component={Home} />
					<Route exact path="/psychologists/appointments" component={Appointments} />
					<Route exact path="/psychologists/chat" component={Chat} />
					<Route exact path="/psychologists/profile" component={Profile} />

					<Route exact path="/500" component={Error500} />
					<Redirect to="/psychologists/home" />
				</Switch>
			);
		} else {
			// eslint-disable-next-line
			let userType = location.pathname?.substring(1).split('/')?.[0];
			if (!userType) userType = 'users'; // for development purposes

			if (userType === 'psychologists') {
				return (
					<Switch>
						<Route exact path="/psychologists/login" component={Login} />
						<Route exact path="/psychologists/recover-password" component={RecoverPassword} />
						<Route exact path="/psychologists/recover-password/:id/:code" component={RecoverPassword} />
						<Route exact path="/psychologists/confirm-account" component={ConfirmAccount} />
						<Route exact path="/psychologists/confirm-account/:id/:code" component={DefinePassword} />

						<Route exact path="/500" component={Error500} />
						<Redirect to="/psychologists/login" />
					</Switch>
				);
			}

			return (
				<Switch>
					<Route exact path="/users/login" component={Login} />
					<Route exact path="/users/recover-password" component={RecoverPassword} />
					<Route exact path="/users/recover-password/:id/:code" component={RecoverPassword} />
					<Route exact path="/users/confirm-account" component={ConfirmAccount} />
					<Route exact path="/users/confirm-account/:id/:code" component={DefinePassword} />

					<Route exact path="/500" component={Error500} />
					<Redirect to="/users/login" />
				</Switch>
			);
		}
	}
}

const mapStateToProps = (state: any) => ({
	router: state.router,
	user: state.user,
	token: state.token,
});

export default connect(mapStateToProps)(Routes);
