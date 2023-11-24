import React from 'react';
import { connect } from 'react-redux';
import { delayedDispatch, setBreadcrumb, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { ContentWrapper } from 'components';
import Strings from 'utils/strings';
import { translate } from 'utils/utils';
import './styles.scss';

class ClientDetail extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			client: null,
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { client } = this.state;
		const { dispatch, match } = this.props;

		dispatch(setTitle(`${Strings.sidebar.clients} - ${translate(client?.name) || Strings.clients.new}`));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.clients,
							route: "/clients",
							icon: "partner",
						},
						{
							text: match.params.id === 'new' ? Strings.clients.new : client?.name,
							icon: match.params.id === 'new' ? 'plus' : 'pencil-outline',
						},
					],
					actions: [
						{
							type: "button",
							text: Strings.generic.save,
							onClick: () => { },
							disabled: !this.state.hasUnsavedFields,
							className: this.state.hasUnsavedFields ? "BreadcrumbButtonSuccess" : "",
							isSave: true,
						},
					],
				};
			})
		);
	}

	componentDidUpdate() {
		const { client } = this.state;
		const { dispatch } = this.props;

		dispatch(updateCrumb());
		dispatch(setTitle(`${Strings.sidebar.gallery} - ${translate(client?.name) || Strings.clients.new}`));
	}

	async getData() { }

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.clients.client}</title>
					<meta name="description" content="Description of Client Details" />
				</Helmet>
				<div className="ClientDetailScreen">
					<ContentWrapper extraStyle={{ padding: 20 }}>

					</ContentWrapper>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(ClientDetail);