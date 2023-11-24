import React from 'react';
import { connect } from 'react-redux';
import { delayedDispatch, setBreadcrumb, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { ContentWrapper } from 'components';
import Strings from 'utils/strings';
import { translate } from 'utils/utils';
import './styles.scss';

class PsychologistDetail extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			psychologist: null,
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { psychologist } = this.state;
		const { dispatch, match } = this.props;

		dispatch(setTitle(`${Strings.sidebar.psychologists} - ${translate(psychologist?.name) || Strings.psychologists.new}`));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.psychologists,
							route: "/psychologists",
							icon: "psychologist",
						},
						{
							text: match.params.id === 'new' ? Strings.psychologists.new : psychologist.name,
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
		const { psychologist } = this.state;
		const { dispatch } = this.props;

		dispatch(updateCrumb());
		dispatch(setTitle(`${Strings.sidebar.gallery} - ${translate(psychologist?.name) || Strings.psychologists.new}`));
	}

	async getData() { }

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.psychologists}</title>
					<meta name="description" content="Description of Psychologist Details" />
				</Helmet>
				<div className="PsychologistDetailScreen">
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

export default connect(mapStateToProps)(PsychologistDetail);