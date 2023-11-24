/**
 *
 * Header
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { setLanguage, setLogout } from "store/actions";
import { Dropdown, Menu } from "antd";
import { Breadcrumb, Icons } from "components";
import { parseLinks } from "utils/utils";
import Strings from "utils/strings";

import "./styles.scss";

/* eslint-disable react/prefer-stateless-function */
export class Header extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			open: false,
			isMobile: window.innerWidth < 768,
		};

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.handleResize = this.handleResize.bind(this);
		window.addEventListener("resize", this.handleResize);
	}

	componentDidMount() {
		this.handleResize();
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	toggleSidebar() {
		const { onToggleSidebar } = this.props;
		onToggleSidebar();
	}

	goToProfile() {
		const { dispatch } = this.props;
		dispatch(push("/profile"));
	}

	logout() {
		const { dispatch } = this.props;

		localStorage.removeItem("token");
		dispatch(setLogout());
		dispatch(push(parseLinks("/")));
	}

	handleResize() {
		this.setState({ isMobile: window.innerWidth < 768 });
	}

	getLanguage(language: string) {
		if (language === 'pt') return Strings.language.portuguese;
		else return Strings.language.english;
	}

	renderOptions() {
		const { dispatch, language } = this.props;

		const menu = (
			<Menu>
				<Menu.Item
					key="1"
					style={{
						height: 40,
						display: 'flex',
						alignItems: 'center'
					}}
					onClick={() => dispatch(setLanguage('pt'))}
				>
					{Strings.language.portuguese}
				</Menu.Item>
				<Menu.Item
					key="separator"
					style={{
						height: 1,
						backgroundColor: '#EEE',
						padding: 0
					}} />
				<Menu.Item
					key="2"
					style={{
						height: 40,
						display: 'flex',
						alignItems: 'center'
					}}
					onClick={() => dispatch(setLanguage('en'))}
				>
					{Strings.language.english}
				</Menu.Item>
			</Menu>
		);

		return (
			<div className="HeaderOptions">
				<Dropdown overlay={menu} trigger={["click"]}>
					<div className="HeaderLanguagePicker">
						<p>{this.getLanguage(language)}</p>
						<Icons.Caret />
					</div>
				</Dropdown>
				<button className="HeaderIcon">
					<Icons.Message />
				</button>
				<button className="HeaderIcon">
					<Icons.Bell />
				</button>
				<button
					className="HeaderIcon"
					onClick={() => this.logout()}
				>
					<Icons.Door />
				</button>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				<div className="HeaderContainer">
					<div id="AppHeader" className="Header">
						{this.renderOptions()}
					</div>
				</div>
				<Breadcrumb />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	router: state.router,
	title: state.title,
	user: state.user,
	language: state.language,
	settings: state.settings,
});

export default connect(mapStateToProps)(Header);
