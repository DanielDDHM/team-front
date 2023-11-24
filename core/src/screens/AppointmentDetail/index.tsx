import React from 'react';
import { connect } from 'react-redux';
import { delayedDispatch, setBreadcrumb, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { ContentWrapper } from 'components';
import { DateTime } from 'luxon';
import Strings from 'utils/strings';
import './styles.scss';

class AppointmentDetail extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			appointment: null,
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { appointment } = this.state;
		const { dispatch, match } = this.props;

		dispatch(setTitle(`${Strings.sidebar.appointments} - ${Strings.appointments.new}`));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.appointments,
							route: "/appointments",
							icon: "calendar",
						},
						{
							text: match.params.id === 'new' ? Strings.appointments.new : (appointment?.date && DateTime.fromISO(appointment.date).toFormat('dd/LL/yyyy HH:mm')),
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
		const { dispatch } = this.props;

		dispatch(updateCrumb());
		dispatch(setTitle(`${Strings.sidebar.appointments} - ${Strings.appointments.new}`));
	}

	async getData() { }

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.appointments}</title>
					<meta name="description" content="Description of Appointment Details" />
				</Helmet>
				<div className="AppointmentDetailScreen">
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

export default connect(mapStateToProps)(AppointmentDetail);