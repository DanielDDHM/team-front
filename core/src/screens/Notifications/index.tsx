import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from 'store/actions';
import { Props, State } from './types';
import { Helmet } from 'react-helmet';
import Strings from 'utils/strings';
import { Table } from 'components';
import { push } from 'connected-react-router';

class Notifications extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			notifications: [],
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		this.getData();
	}

	async getData() { }

	render() {
		const { notifications } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.notifications}</title>
					<meta name="description" content="Description of Notifications" />
				</Helmet>
				<Table
					title={{
						icon: "bell1",
						title: Strings.sidebar.notifications
					}}
					data={notifications}
					columns={[
						{
							Header: Strings.fields.name,
							id: 'name',
							accessor: (row: any) => row.name || '-',
						},
						{
							Header: Strings.gallery.type,
							id: 'gallery',
							accessor: (row: any) => row.gallery?.type || '-',
						},
					]}
					filterable
					add={{
						onClick: () => dispatch(push('/notifications/new')),
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
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(Notifications);