import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { setTitle } from 'store/actions';
import { Props, State } from './types';
import { Helmet } from 'react-helmet';
import { Table } from 'components';
import Strings from 'utils/strings';

class Gallery extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			library: [],
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		this.getData();
	}

	async getData() { }

	render() {
		const { library } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.gallery}</title>
					<meta name="description" content="Description of Gallery" />
				</Helmet>
				<Table
					title={{
						icon: "frame",
						title: Strings.sidebar.gallery
					}}
					data={library}
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
					headerOptions={[
						{
							icon: 'filter',
							label: Strings.generic.filters,
							onClick: () => { },
						},
					]}
					filterable
					add={{
						onClick: () => dispatch(push('/library/new')),
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

export default connect(mapStateToProps)(Gallery);