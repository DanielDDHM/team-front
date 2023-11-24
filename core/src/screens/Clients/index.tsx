import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from 'store/actions';
import { Props, State } from './types';
import { Helmet } from 'react-helmet';
import Strings from 'utils/strings';
import { Table } from 'components';
import { push } from 'connected-react-router';

class Clients extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			clients: [],
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		this.getData();
	}

	async getData() { }

	render() {
		const { clients } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.settings}</title>
					<meta name="description" content="Description of Settings" />
				</Helmet>
				<Table
					title={{
						icon: "partner",
						title: Strings.sidebar.clients
					}}
					data={clients}
					columns={[
						{
							Header: Strings.fields.name,
							id: 'name',
							accessor: (row: any) => row.name,
						},
						{
							Header: Strings.fields.email,
							id: 'email',
							accessor: (row: any) => row.email,
						},
					]}
					filterable
					add={{
						onClick: () => dispatch(push('/clients/new')),
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

export default connect(mapStateToProps)(Clients);