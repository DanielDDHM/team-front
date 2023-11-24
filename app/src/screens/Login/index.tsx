/*
 *
 * Login
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";
import { setUser, setToken } from "store/actions";
import { Input } from "antd";
import { Icons } from "components";
import { RotateSpinner } from "react-spinners-kit";
import Strings from "utils/strings";
import "./styles.scss";

export class Login extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: "",
			password: "",

			signingIn: false,
			isMobile: window.innerWidth <= 768,
		};

		this.handleResize = this.handleResize.bind(this);
		window.addEventListener("resize", this.handleResize);
	}

	componentDidMount() {
		this.handleResize();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	handleResize() {
		this.setState({ isMobile: window.innerWidth <= 768 });
	}

	async login() {
		const { dispatch } = this.props;

		// eslint-disable-next-line
		const path = location?.pathname?.substring(1).split('/')?.[0];

		if (path === 'user') {
			const data = {
				user: {
					name: 'User',
					photo: 'https://s3-alpha-sig.figma.com/img/7f45/8068/3bbdf04ae531fd255383df69e593d824?Expires=1647820800&Signature=dlJcU6PCdp~Xbdq~4tfae7azw-vxARdAXI42FwX16HnoC7Zp7839EJWlsjCTaVAhHMifKBtRvrJaqiLJ7eOrBVE1~JA6PJE1Fjpn8e5rA4JRNcr7LwM08IZgos5CRyq5S7IkcUTHA7WBpXJqc8f1b3McEj9HOPj8Me4JzWaUPKbtNjhcSrX4LP9IZZidBA9mnDpP7565yF9GayveAdLMU7HDxYSIgpW-x6emYV8BogJO3AadWFKSb4z95x6OFzJVC4TP4FR6JUHUqKkys7ZgWCOvFuQgWVwaasogbi--Z5KyiTMsVPw1JE~sprICt2o5gfM2aloWG7CtLKlXH2ZNyQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
					business: {
						name: 'Dummy Business',
					},
					role: 'user',
				},
				token: '089IOBN435N039784TNG0987324HT024',
			};
	
			dispatch(setUser(data.user));
			dispatch(setToken(data.token));
		} else {
			const data = {
				user: {
					name: 'Psychologist',
					photo: 'https://s3-alpha-sig.figma.com/img/7f45/8068/3bbdf04ae531fd255383df69e593d824?Expires=1647820800&Signature=dlJcU6PCdp~Xbdq~4tfae7azw-vxARdAXI42FwX16HnoC7Zp7839EJWlsjCTaVAhHMifKBtRvrJaqiLJ7eOrBVE1~JA6PJE1Fjpn8e5rA4JRNcr7LwM08IZgos5CRyq5S7IkcUTHA7WBpXJqc8f1b3McEj9HOPj8Me4JzWaUPKbtNjhcSrX4LP9IZZidBA9mnDpP7565yF9GayveAdLMU7HDxYSIgpW-x6emYV8BogJO3AadWFKSb4z95x6OFzJVC4TP4FR6JUHUqKkys7ZgWCOvFuQgWVwaasogbi--Z5KyiTMsVPw1JE~sprICt2o5gfM2aloWG7CtLKlXH2ZNyQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
					business: {
						name: 'Dummy Business',
					},
					role: 'psychologist',
				},
				token: '089IOBN435N039784TNG0987324HT024',
			};
	
			dispatch(setUser(data.user));
			dispatch(setToken(data.token));
		}

		// const { dispatch } = this.props;
		// const { email, password } = this.state;
		// const body = {
		// 	email,
		// 	password,
		// };

		// this.setState({ signingIn: true });

		// const response = await API.post({
		// 	url: Endpoints.uriLogin(),
		// 	data: body,
		// });

		// if (response.ok) {
		// 	const { user, token } = response.data.results;
		// 	dispatch(setUser({ ...user }));
		// 	dispatch(setToken(token));
		// 	dispatch(push("/"));
		// } else {
		// 	const { code } = response.data;
		// 	if (code === 'USER_NOT_CONFIRMED') {
		// 		notification.error({
		// 			message: Strings.authentication.header,
		// 			description: Strings.serverErrors.accountNotConfirmed,
		// 			placement: 'bottomRight',
		// 			duration: 5,
		// 		});
		// 	} else if (code === 'INVALID_CREDENTIALS') {
		// 		notification.error({
		// 			message: Strings.authentication.header,
		// 			description: Strings.serverErrors.invalidCredentials,
		// 			placement: 'bottomRight',
		// 			duration: 5,
		// 		});
		// 	}

		// 	this.setState({ signingIn: false });
		// }
	}

	render() {
		const { signingIn, email, password } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.login}</title>
					<meta name="description" content="Description of Login" />
				</Helmet>
				<div className="LoginContent">
					<div className="LoginContentWrapper">
						<div className="LoginBox">
							<div className="LoginWelcome" />
							<div className="LoginWrapper">
								<div className="LoginBackground" />
								<div className="LoginForm">
									<h1>{Strings.authentication.login}</h1>
									<h3>{Strings.authentication.typeCredentials}</h3>
									<form
										onSubmit={(e: any) => {
											e.preventDefault();

											if (!signingIn) {
												this.login();
											}
										}}
									>
										<Input
											placeholder={Strings.placeholders.email}
											className="LoginInputClass"
											value={email}
											type="email"
											required
											prefix={<Icons.Message smaller />}
											onChange={(e: any) =>
												this.setState({ email: e.target.value })
											}
										/>
										<Input
											placeholder="••••••••"
											className="LoginInputClass"
											value={password}
											type="password"
											required
											prefix={<Icons.Lock />}
											onChange={(e: any) =>
												this.setState({ password: e.target.value })
											}
										/>
										<div className="LoginOptions">
											<a
												href="/users/recover-password"
												onClick={(e: any) => {
													e.preventDefault();
													dispatch(push("/users/recover-password"));
												}}
												className="LoginOptionLink"
											>
												{Strings.authentication.forgotPassword}
											</a>
											<a
												href="/users/confirm-account"
												onClick={(e: any) => {
													e.preventDefault();
													dispatch(push("/users/confirm-account"));
												}}
												className="LoginOptionLink --no-decoration"
											>
												{Strings.authentication.loginConfirmAccount}
												<span>{Strings.authentication.loginConfirmAccount2}</span>
											</a>
										</div>
										<button type="submit" className="LoginButtonClass">
											{signingIn ? (
												<div className="LoadingSpinner">
													<RotateSpinner size={24} color="#FFFFFF" />
												</div>
											) : (
												Strings.authentication.signIn
											)}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Login);
