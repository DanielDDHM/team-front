import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from 'store/actions';
import { Props, State } from './types';
import { Helmet } from 'react-helmet';
import Strings from 'utils/strings';
import { Table } from 'components';
import { push } from 'connected-react-router';
import { DateTime } from 'luxon';

class Appointments extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			appointments: [],
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		this.getData();
	}

	async getData() { }

	render() {
		const { appointments } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.appointments}</title>
					<meta name="description" content="Description of Appointments" />
				</Helmet>
				<Table
					title={{
						icon: "calendar",
						title: Strings.sidebar.appointments
					}}
					data={appointments}
					columns={[
						{
							Header: Strings.fields.date,
							id: 'date',
							accessor: (row: any) => (row.date && DateTime.fromISO(row.date).toFormat('dd/LL/yyyy HH:mm')) || '-',
							maxWidth: 200,
							Filter: () => { }
						},
						{
							Header: Strings.appointments.psychologist,
							id: 'psychologist',
							accessor: (row: any) => row.psychologist?.name || '-',
						},
						{
							Header: Strings.appointments.client,
							id: 'client',
							accessor: (row: any) => row.client?.name || '-',
						},
					]}
					headerOptions={[
						{
							icon: 'filter',
							label: 'Filtros',
							onClick: () => { },
						},
					]}
					filterable
					add={{
						onClick: () => dispatch(push('/appointments/new')),
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

export default connect(mapStateToProps)(Appointments);