/*
 *
 * Recover Password
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";
import { Row, Col, Result, notification } from "antd";
import { RotateSpinner } from "react-spinners-kit";
import { API, Endpoints } from "utils/api";
import { emailIsValid } from "utils/utils";
import Strings from "utils/strings";
import "./styles.scss";

export class RecoverPassword extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			isDefiningPassword:
				(props.match?.params?.id && props.match?.params?.code) || false,
			email: "",
			password: "",
			repeatPassword: "",

			recoveringPassword: false,
			settingPassword: false,

			isMobile: window.innerWidth <= 768,
		};

		this.handleResize = this.handleResize.bind(this);
		window.addEventListener("resize", this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	handleResize() {
		this.setState({ isMobile: window.innerWidth <= 768 });
	}

	async recoverPassword() {
		const { email } = this.state;

		if (!email || !email.trim() || !emailIsValid(email)) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.emailIsInvalid,
                placement: 'bottomRight',
                duration: 5,
            });
			return;
		}

		this.setState({ recoveringPassword: true });

		const response = await API.post({
			url: Endpoints.uriUsers("recover-password"),
			data: { email },
		});

		if (response.ok) {
            notification.success({
                message: Strings.authentication.header,
                description: Strings.authentication.emailSent,
                placement: 'bottomRight',
                duration: 5,
            });
		}

		this.setState({ recoveringPassword: false, email: "" });
	}

	passwordIsValid() {
		const { password, repeatPassword } = this.state;

		if (!password || !repeatPassword) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.pleaseFillFormCorrectly,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		if (password !== repeatPassword) {
			notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.passwordsDontMatch,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		return true;
	}
	async setPassword() {
		const { password } = this.state;
		const { match, dispatch } = this.props;
		const { params } = match;
		const { id, code } = params;

		if (this.passwordIsValid()) {
			this.setState({ settingsPassword: true });
	
			const body = {
				_id: id,
				password,
			} as any;
	
			const response = await API.post({
				url: Endpoints.uriUsers(`recover-password/${code}`),
				data: body,
			});
	
			if (response.ok) {
                notification.success({
                    message: Strings.authentication.header,
                    description: Strings.authentication.passwordChanged,
                    placement: 'bottomRight',
                    duration: 5,
                });

				dispatch(push('/login'));
			}
	
			this.setState({ settingsPassword: false, password: "", repeatPassword: "" });
		}
	}

	renderForm() {
		const {
			email,
			password,
			repeatPassword,
			recoveringPassword,
			settingPassword,
			isDefiningPassword,
		} = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.recoverPassword}</title>
					<meta name="description" content="Description of Recover Password" />
				</Helmet>
				<div className="RecoverPasswordContent">
					<div className="RecoverPasswordContentWrapper">
						<Row>
							<Col
								xs={24}
								sm={{ span: 18, offset: 3 }}
								lg={{ span: 18, offset: 3 }}
							>
								<h2 style={{ fontWeight: "bold" }}>
									{Strings.authentication.recoverPassword}
								</h2>
								<div className="RecoverPasswordBox">
									<Row>
										<Col xs={24} lg={12}>
											<div className="RecoverPasswordWrapper">
												<h2>{Strings.authentication.recoverPassword}</h2>
												<form
													onSubmit={(e: any) => {
														e.preventDefault();

														if (isDefiningPassword) {
															if (!settingPassword) {
																this.setPassword();
															}
														} else {
															if (!recoveringPassword) {
																this.recoverPassword();
															}
														}
													}}
												>
													{isDefiningPassword ? (
														<React.Fragment>
															<input
																placeholder={Strings.placeholders.newPassword}
																className="RecoverPasswordInputClass"
																value={password}
																required
																type="password"
																onChange={(e: any) =>
																	this.setState({ password: e.target.value })
																}
															/>
															<input
																placeholder={Strings.placeholders.confirmPassword}
																className="RecoverPasswordInputClass"
																value={repeatPassword}
																required
																type="password"
																onChange={(e: any) =>
																	this.setState({ repeatPassword: e.target.value })
																}
															/>
														</React.Fragment>
													) : (
														<React.Fragment>
															<input
																placeholder={Strings.placeholders.email}
																className="RecoverPasswordInputClass"
																value={email}
																type="email"
																required
																onChange={(e: any) =>
																	this.setState({ email: e.target.value })
																}
															/>
															<div className="RecoverPasswordOptions">
																<div />
																<a
																	href="/login"
																	onClick={(e: any) => {
																		e.preventDefault();
																		dispatch(push("/login"));
																	}}
																	className="RecoverPasswordOptionLink"
																>
																	<small>
																		{Strings.authentication.rememberedPassword}
																	</small>
																</a>
															</div>
														</React.Fragment>
													)}
													<button
														type="submit"
														className="RecoverPasswordButtonClass"
													>
														{recoveringPassword || settingPassword ? (
															<div className="LoadingSpinner">
																<RotateSpinner size={24} color="#FFFFFF" />
															</div>
														) : isDefiningPassword ? (
															Strings.authentication.changePassword
														) : (
															Strings.authentication.recoverPassword
														)}
													</button>
												</form>
											</div>
										</Col>
										<Col xs={0} lg={12}>
											<div className="RecoverPasswordWelcome">
												<div className="RecoverPasswordAuthenticationWrapper">
													<Result status="404" />
												</div>
											</div>
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.recoverPassword}</title>
					<meta name="description" content="Description of RecoverPassword" />
				</Helmet>
				{this.renderForm()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(RecoverPassword);
