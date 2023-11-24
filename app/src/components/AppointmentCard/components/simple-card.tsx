import Icons from 'components/Icons';
import React from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import strings from 'utils/strings';
import './styles.scss';

import UserPlaceholder from "assets/images/placeholders/user2x.jpg";

class SimpleAppointmentCard extends React.Component<any, any> {
	render() {
		const { appointment, simple = false, empty = false, onClick, language, noButton = false } = this.props;

		return (
			<div className={`SimpleAppointmentCardWrapper${simple ? ' --card-simple' : ''}`}>
				{!simple &&
					(<div className="AppointmentType">
						<p>{empty ? strings.home.psychologicalAppointment : appointment?.type}</p>
					</div>
					)}
				<div className="AppointmentDetailsWrapper">
					<div className="AppointmentDetails">
						{!empty && (
							<div className="PsychologistAvatar">
								<img src={appointment?.psychologist?.photo || UserPlaceholder} alt="psychologist avatar" />
							</div>
						)}
						<div className="PsychologistDetails">
							<p>{appointment?.psychologist?.name}</p>
							{empty ? (
								<div className="CardRow">
									<div className="CardRowIconWrapper --card-empty">
										<Icons.Calendar color={simple ? 'blue' : 'white'} />
										<p>{strings.home.scheduleVideoAppointment}</p>
									</div>
								</div>
							) : (
								<div className="CardRow">
									<div className="CardRowIconWrapper">
										<Icons.Calendar smaller color={simple ? 'blue' : 'white'} />
										<p>{DateTime.fromISO(appointment?.date).setLocale(language).toFormat('dd LLLL yyyy')}</p>
									</div>
									<div className="CardRowIconWrapper">
										<Icons.Clock color={simple ? 'blue' : 'white'} />
										<p>{DateTime.fromISO(appointment?.date).toFormat('HH:mm')}H</p>
									</div>
								</div>
							)}
						</div>
					</div>
					{!noButton &&
						!simple && (
							<div className="AppointmentVideoContainer">
								<button
								onClick={() => {
									if (typeof onClick === 'function') {
										onClick();
									}
								}}
								className="VideoIconWrapper"
								>
									{empty ? (
										<Icons.Arrow />
									) : (
										<Icons.Camera />
									)}
								</button>
							</div>
						)
					}
				</div >
			</div >
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(SimpleAppointmentCard);