/**
 *
 * Sidebar
 *
 */

import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Icons } from "components";
import { parseLinks } from "utils/utils";
import Strings from "utils/strings";
import "./styles.scss";

import UserPlaceholder from "assets/images/placeholders/user2x.jpg";
import Logo from "assets/images/logo.png";

export class Sidebar extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			activeTab: "/dashboard",
		};

		this.selectTab = this.selectTab.bind(this);
		this.goTo = this.goTo.bind(this);
	}

	selectTab(url: String) {
		const { activeTab } = this.state;

		this.setState({ activeTab: activeTab === url ? "" : url });
	}

	goTo(url: String) {
		this.setState({ activeTab: url });
		this.props.dispatch(push(parseLinks(`/${url}`)));
	}

	render() {
		const { dispatch, user } = this.props;

		let path = window.location.pathname;
		if (user.role === 'user') {
			path = path.replace('/users/', '');
		} else if (user.role === 'psychologist') {
			path = path.replace('/psychologists/', '');
		}

		return (
			<div className="SidebarWrapper">
				<div className="SidebarContainer open">
					<div className="UserContainer">
						<img src={user?.photo || UserPlaceholder} alt="user avatar" />
						<div className="UserDetails">
							<p>{Strings.sidebar.hello}	{user?.name}!</p>
							<p>{user?.business?.name || 'No Business'}</p>
						</div>
					</div>
					<div className="SidebarContent">
						<div className="SidebarMenus">
							<a
								href={`${window.location.origin}/`}
								onClick={(e) => {
									e.preventDefault();
									this.goTo("home");
								}}
								className={`SidebarMenuObject${path === 'home' ? ' --menu-active' : ''}`}
							>
								<span className="SidebarMenuIcon">
									{path === 'home' ? <Icons.HomeFilled /> : <Icons.Home />}
								</span>
								<p>{Strings.sidebar.home}</p>
							</a>
							<a
								href={`${window.location.origin}/`}
								onClick={(e) => {
									e.preventDefault();
									this.goTo("appointments");
								}}
								className={`SidebarMenuObject${path === 'appointments' ? ' --menu-active' : ''}`}
							>
								<span className="SidebarMenuIcon">
									{path === 'appointments' ? <Icons.CalendarFilled /> : <Icons.Calendar />}
								</span>
								<p>{Strings.sidebar.appointments}</p>
							</a>
							<a
								href={`${window.location.origin}/`}
								onClick={(e) => {
									e.preventDefault();
									this.goTo("chat");
								}}
								className={`SidebarMenuObject${path === 'chat' ? ' --menu-active' : ''}`}
							>
								<span className="SidebarMenuIcon">
									{path === 'chat' ? <Icons.ChatFilled /> : <Icons.Chat />}
								</span>
								<p>{Strings.sidebar.chat}</p>
							</a>
							<a
								href={`${window.location.origin}/`}
								onClick={(e) => {
									e.preventDefault();
									this.goTo("profile");
								}}
								className={`SidebarMenuObject${path === 'profile' ? ' --menu-active' : ''}`}
							>
								<span className="SidebarMenuIcon">
									{path === 'profile' ? <Icons.ProfileFilled /> : <Icons.Profile />}
								</span>
								<p>{Strings.sidebar.profile}</p>
							</a>
						</div>
						<div className="SidebarLinks">
							<div className="SidebarSeparator" />
							<div className="SidebarLogo">
								<img src={Logo} alt="sidebar logo" />
							</div>
							<div className="SidebarSeparator" />
							<div className="SidebarLegalLinks">
								<a
									href={parseLinks('/terms-and-conditions')}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e: any) => {
										e.preventDefault();
										dispatch(push(parseLinks('/terms-and-conditions')));
									}}
								>
									{Strings.sidebar.terms}
								</a>
								<a
									href={parseLinks('/privacy-policy')}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e: any) => {
										e.preventDefault();
										dispatch(push(parseLinks('/privacy-policy')));
									}}
								>
									{Strings.sidebar.privacy}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	settings: state.settings,
	user: state.user,
	language: state.language,
});

export default connect(mapStateToProps)(Sidebar);
