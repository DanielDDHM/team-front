import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { setTitle } from 'store/actions';
import { Props, State } from './types';
import { Helmet } from 'react-helmet';
import { Table } from 'components';
import Strings from 'utils/strings';

class Psychologists extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			psychologists: [],
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setTitle(''));

		this.getData();
	}

	async getData() { }

	render() {
		const { psychologists } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.psychologists}</title>
					<meta name="description" content="Description of Psychologists" />
				</Helmet>
				<Table
					title={{
						icon: "psychologist",
						title: Strings.sidebar.psychologists
					}}
					data={psychologists}
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
						onClick: () => dispatch(push('/psychologists/new')),
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

export default connect(mapStateToProps)(Psychologists);