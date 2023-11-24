/*
*
* Register
*
*/

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { push } from "connected-react-router";
import { Row, Col, Result, notification } from "antd";
import { RotateSpinner } from "react-spinners-kit";
import { emailIsValid } from "utils/utils";
import { API, Endpoints } from "utils/api";
import Strings from "utils/strings";
import "./styles.scss";

export class Register extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			repeatPassword: '',

			registering: false,
		};
	}

	componentDidMount() {
		const { dispatch, user } = this.props;

		if (user) {
			dispatch(push("/"));
		}
	}

	registerIsValid() {
		const { name, email, password, repeatPassword } = this.state;
	
		if (!name || !name.trim() || !email || !email.trim() || !emailIsValid(email) || !password || !repeatPassword) {
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
                message: Strings.authentication.header,
                description: Strings.errors.passwordsDontMatch,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		return true;
	}

	async register() {
		const { name, email, password } = this.state;
		const { dispatch } = this.props;

		if (this.registerIsValid()) {
			this.setState({ registering: true });

			const body = {
				name,
				email,
				password,
			};

			const response = await API.post({
				url: Endpoints.uriUsers(),
				data: body,
			});

			if (response.ok) {
                notification.success({
                    message: Strings.authentication.header,
                    description: Strings.authentication.registeredSuccessfully,
                    placement: 'bottomRight',
                    duration: 5,
                });

				dispatch(push("/login"));
			}

			this.setState({ registering: false });
		}
	}

	render() {
		const { name, email, password, repeatPassword, registering } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.register}</title>
					<meta name="description" content="Description of Register" />
				</Helmet>
				<div className="RegisterContent">
					<div className="RegisterContentWrapper">
						<Row>
							<Col
								xs={24}
								sm={{ span: 18, offset: 3 }}
								lg={{ span: 18, offset: 3 }}
							>
								<h2 style={{ fontWeight: 'bold' }}>{Strings.authentication.register}</h2>
								<div className="RegisterBox">
									<Row>
										<Col xs={24} lg={12}>
											<div className="RegisterWrapper">
												<h2>{Strings.authentication.newAccount}</h2>
												<form
													onSubmit={(e: any) => {
														e.preventDefault();

														if (!registering) {
															this.register();
														}
													}}
												>
													<input
														placeholder={Strings.placeholders.name}
														className="RegisterInputClass"
														value={name}
														type="text"
														onChange={(e: any) =>
															this.setState({ name: e.target.value })
														}
														required
													/>
													<input
														placeholder={Strings.placeholders.email}
														type="email"
														className="RegisterInputClass"
														value={email}
														onChange={(e: any) =>
															this.setState({ email: e.target.value })
														}
														required
													/>
													<input
														placeholder={Strings.placeholders.password}
														type="password"
														className="RegisterInputClass"
														value={password}
														onChange={(e: any) =>
															this.setState({ password: e.target.value })
														}
														required
													/>
													<input
														placeholder="repeat password"
														className="RegisterInputClass"
														value={repeatPassword}
														type="password"
														onChange={(e: any) =>
															this.setState({ repeatPassword: e.target.value })
														}
														required
													/>
													<div className="RegisterOptions">
														<div />
														<a
															href="/login"
															onClick={(e: any) => {
																e.preventDefault();
																dispatch(push("/login"));
															}}
															className="LoginOptionLink"
														>
															<small>Have an Account?</small>
														</a>
													</div>
													<button type="submit" className="LoginButtonClass">
														{registering ? (
															<div className="LoadingSpinner">
																<RotateSpinner size={24} color="#FFFFFF" />
															</div>
														) : (
															Strings.authentication.register
														)}
													</button>
												</form>
											</div>
										</Col>
										<Col xs={0} lg={12}>
											<div className="LoginWelcome">
												<div className="LoginAuthenticationWrapper">
													<Result status="500" />
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
}

const mapStateToProps = (state: any) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Register);