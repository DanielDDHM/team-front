/*
 *
 * Confirm Account
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { Input } from "antd";
import { Icons } from "components";
import { RotateSpinner } from "react-spinners-kit";
import Strings from "utils/strings";
import "./styles.scss";

export class ConfirmAccount extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			email: "",

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

	async sendEmail() { }

	render() {
		const { confirming, email } = this.state;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.authentication.confirmAccount}</title>
					<meta name="description" content="Send an e-mail to confirm your account" />
				</Helmet>
				<div className="ConfirmAccountContent">
					<div className="ConfirmAccountContentWrapper">
						<div className="LoginBox">
							<div className="LoginWelcome" />
							<div className="LoginWrapper">
								<div className="LoginBackground" />
								<div className="LoginForm">
									<h1>{Strings.authentication.confirmAccount}</h1>
									<h3>{Strings.authentication.insertEmail}</h3>
									<form
										onSubmit={(e: any) => {
											e.preventDefault();

											if (!confirming) {
												this.sendEmail();
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
										<button type="submit" className="LoginButtonClass">
											{confirming ? (
												<div className="LoadingSpinner">
													<RotateSpinner size={24} color="#FFFFFF" />
												</div>
											) : (
												Strings.authentication.sendEmail
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

export default connect(mapStateToProps)(ConfirmAccount);
