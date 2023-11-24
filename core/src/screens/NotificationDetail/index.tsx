import React from 'react';
import { connect } from 'react-redux';
import { delayedDispatch, setBreadcrumb, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { ContentWrapper } from 'components';
import { DateTime } from 'luxon';
import Strings from 'utils/strings';
import './styles.scss';

class NotificationDetail extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			notification: null,
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { notification } = this.state;
		const { dispatch, match } = this.props;

		dispatch(setTitle(`${Strings.sidebar.notifications} - ${Strings.notifications.new}`));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.notifications,
							route: "/notifications",
							icon: "bell1",
						},
						{
							text: match.params.id === 'new' ? Strings.notifications.new : (notification?.date && DateTime.fromISO(notification.date).toFormat('dd/LL/yyyy HH:mm')),
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
		dispatch(setTitle(`${Strings.sidebar.notifications} - ${Strings.notifications.new}`));
	}

	async getData() { }

	render() {
		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.notifications}</title>
					<meta name="description" content="Description of Notification Details" />
				</Helmet>
				<div className="NotificationDetailScreen">
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

export default connect(mapStateToProps)(NotificationDetail);