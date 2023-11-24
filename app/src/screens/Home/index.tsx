/*
 *
 * Home
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { setBreadcrumb } from 'store/actions';
import { SimpleAppointmentCard } from 'components';
import { DateTime } from 'luxon';
import { parseLinks } from 'utils/utils';
import Strings from 'utils/strings';
import './styles.scss';

export class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			appointments: [
				{
					psychologist: {
						name: 'Dra Vânia Leite',
						photo: 'https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
					},
					type: 'Consulta de Psicologia',
					_id: 1231321,
					date: DateTime.utc(),
				},
				{
					psychologist: {
						name: 'Dra Vânia Leite',
						photo: 'https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
					},
					type: 'Consulta de Psicologia',
					_id: 1231322,
					date: DateTime.utc(),
				},
				{
					psychologist: {
						name: 'Dra Vânia Leite',
						photo: 'https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
					},
					type: 'Consulta de Psicologia',
					_id: 1231323,
					date: DateTime.utc(),
				},
			],
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(setBreadcrumb(null))
	}

	render() {
		const { dispatch } = this.props;
		const { appointments } = this.state;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.home} | team</title>
					<meta name="description" content="Description of Home" />
				</Helmet>
				<div className="HomeContent">
					<div className="HomeMainWrapper">
						<h2>
							{appointments?.length > 0 ? (
								Strings.home.nextAppointment
							) : (
								Strings.home.scheduleAppointment
							)}
						</h2>
						<div className="HomeCardsWrapper">
							<SimpleAppointmentCard
								empty={appointments.length === 0}
								appointment={appointments.length > 0 ? appointments[0] : null}
							/>
							<div className="ChatCardWrapper">
								<h2>{Strings.home.needChat}</h2>
								<button
									onClick={() => dispatch(push(parseLinks('/chat')))}
								>
									{Strings.home.startChat}
								</button>
							</div>
						</div>
					</div>
					<div className="FutureAppointmentsWrapper">
						<h2>
							{appointments?.length > 0 ? (
								Strings.home.scheduledAppointments
							) : (
								Strings.home.noAppointments
							)}
						</h2>
						<div className="AppointmentsList">
							{appointments.map((appointment: any) => (
								<SimpleAppointmentCard
									key={`appointment_${appointment._id}`}
									simple
									appointment={appointment}
								/>
							))}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(Home);
