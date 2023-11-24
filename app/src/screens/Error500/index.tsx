/*
*
* 500
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { setLoader, setTitle } from 'store/actions';
import { Helmet } from 'react-helmet';
import { Result } from 'antd';
import { Icon } from 'components';
import { push } from 'connected-react-router';
import Strings from 'utils/strings';
import './styles.scss';

export class Error500 extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const { dispatch, history } = this.props;
		const { location } = history || {};
		const { state } = location || {};

		dispatch(setLoader(false));

		if (!state || !state.lastPage) {
			dispatch(push('/'));
		} else {
			history.replace('/500', {});
		}

		// change this
		dispatch(setTitle(Strings.serverErrors.title));
	}

	goBack(home?: boolean) {
		const { history, dispatch } = this.props;

		if (home) {
			dispatch(push('/'));
		} else {
			history.goBack();
		}
	}

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.serverErrors.title}</title>
					<meta name="description" content="Description of 500" />
				</Helmet>
				<div className="Error500Content">
					<div className="Error500ContentWrapper">
						<Result
							status="500"
							title={Strings.serverErrors.title}
							subTitle={Strings.serverErrors.subTitle}
							extra={
								<div className="Error500_Meanwhile_Container">
									<div onClick={() => this.goBack()} className="Error500_Option">
										<Icon name="refresh m10r" />
										<span>{Strings.serverErrors.refresh}</span>
									</div>
									<div onClick={() => this.goBack(true)} className="Error500_Option">
										<Icon name="house-outline1 m10r" />
										<span>{Strings.serverErrors.backToHome}</span>
									</div>
								</div>
							}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	router: state.router,
});

export default connect(mapStateToProps)(Error500);