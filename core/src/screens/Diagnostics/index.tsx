import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { delayedDispatch, setBreadcrumb, setLoader, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { Table } from 'components';
import Strings from 'utils/strings';
import './styles.scss';
import { notification } from 'antd';

class Diagnostics extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			diagnostics: [],
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.settings,
							route: '/settings',
							icon: "preferences",
						},
						{
							text: Strings.settings.emailTemplates,
							icon: "testimonial",
						},
					],
				}
			})
		);

		this.getData();
	}

	componentDidUpdate() {
		const { dispatch } = this.props;
		dispatch(updateCrumb());
	}

	async getData() {
		const { dispatch } = this.props;

		dispatch(setLoader(true));

		let response: any;
		try {

		} catch (err) {
			notification.error({
				message: Strings.serverErrors.title,
				description: response.data?.message || Strings.serverErrors.wentWrong,
				placement: 'bottomRight',
				duration: 5,
			});
		}

		dispatch(setLoader(false));
	}

	render() {
		const { diagnostics } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.settings.diagnostics}</title>
					<meta name="description" content="Description of Diagnostics" />
				</Helmet>
				<div className="DiagnosticsScreen">
					<Table
						title={{
							icon: "medical-report",
							title: Strings.settings.diagnostics
						}}
						data={diagnostics}
						columns={[
							{
								Header: Strings.fields.name,
								id: 'name',
								accessor: (row: any) => row.name,
							},
						]}
						filterable
						add={{
							onClick: () => dispatch(push('/diagnostics/new')),
						}}
						actions={{
							edit: (original: any) => ({
								onClick: () => { },
							}),
							remove: (original: any) => ({
								onClick: () => { },
							}),
							toggle: (original: any) => ({
								onClick: () => { },
							}),
						}}
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(Diagnostics);