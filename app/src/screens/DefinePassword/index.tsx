/*
 *
 * Confirm Account
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Checkbox, Input } from "antd";
import { Icons } from "components";
import { RotateSpinner } from "react-spinners-kit";
import Strings from "utils/strings";
import "./styles.scss";

export class DefinePassword extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			password: "",
			showPassword: false,
			acceptedTerms: false,
			acceptEmail: false,

			confirming: false,
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

	async setPassword() { }

	render() {
		const { confirming, password, showPassword, acceptedTerms, acceptEmail } = this.state;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.definePassword}</title>
					<meta name="description" content="Define a password for your account" />
				</Helmet>
				<div className="DefinePasswordContent">
					<div className="DefinePasswordContentWrapper">
						<div className="LoginBox">
							<div className="LoginWelcome" />
							<div className="LoginWrapper">
								<div className="LoginBackground" />
								<div className="LoginForm">
									<h1>{Strings.authentication.definePassword}</h1>
									<h3>{Strings.authentication.definePassword2}</h3>
									<form
										onSubmit={(e: any) => {
											e.preventDefault();

											if (!confirming) {
												this.setPassword();
											}
										}}
									>
										<Input
											placeholder={Strings.authentication.password}
											className="LoginInputClass"
											value={password}
											type={showPassword ? "text" : "password"}
											required
											prefix={<Icons.Lock />}
											suffix={
												<button
													className="PasswordInputEye"
													onClick={(e: any) => {
														e.preventDefault()
														e.stopPropagation();
														this.setState((prevState: any) => ({ showPassword: !prevState.showPassword }))
													}}
												>
													<Icons.Eye />
												</button>
											}
											onChange={(e: any) =>
												this.setState({ password: e.target.value })
											}
										/>
										<div className="FormCheckboxes">
											<Checkbox
												checked={acceptedTerms}
												onChange={(e: any) => {
													const value = e.target.checked;
													this.setState({ acceptedTerms: value });
												}}
											>
												<span>{Strings.authentication.acceptTerms} </span>
												<a href="/users/terms-and-conditions" target="_blank" rel="noopener noreferrer">{Strings.sidebar.terms}</a>
												<span> {Strings.authentication.acceptTerms2} </span>
												<a href="/users/privacy-policy" target="_blank" rel="noopener noreferrer">{Strings.sidebar.privacy}</a>
											</Checkbox>
											<Checkbox
												checked={acceptEmail}
												onChange={(e: any) => {
													const value = e.target.checked;
													this.setState({ acceptEmail: value });
												}}
											>
												<span>{Strings.authentication.acceptEmailContent}</span>
											</Checkbox>
										</div>
										<button type="submit" className="LoginButtonClass">
											{confirming ? (
												<div className="LoadingSpinner">
													<RotateSpinner size={24} color="#FFFFFF" />
												</div>
											) : (
												Strings.generic.confirm
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

export default connect(mapStateToProps)(DefinePassword);
