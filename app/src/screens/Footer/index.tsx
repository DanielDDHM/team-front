/*
 *
 * Footer
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Icons } from "components";
import { DateTime } from "luxon";
import strings from "utils/strings";
import "./styles.scss";

export class Footer extends React.Component<any, any> {
	render() {
		return (
			<footer>
				<div className="FooterBanner">
					<p>{strings.generic.supportPlan}</p>	
				</div>
				<div className="FooterSection">
					<div className="FooterAppButtons">
						<a
							href="#appstore"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Icons.AppStore />
						</a>
						<a
							href="#googleplay"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Icons.GooglePlay />
						</a>
					</div>
					<div className="FooterCopyright">
						<span>Copyright &copy; {DateTime.utc().year} - team</span>
					</div>
					<div className="FooterSocialLinks"></div>
				</div>
			</footer>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(Footer);
