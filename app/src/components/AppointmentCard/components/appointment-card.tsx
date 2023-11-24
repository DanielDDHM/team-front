import Icons from "components/Icons";
import React from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import "./styles.scss";

import UserPlaceholder from "assets/images/placeholders/user2x.jpg";
import strings from "utils/strings";
import { Popconfirm } from "antd";

class AppointmentCard extends React.Component<any, any> {
	render() {
		const {
			appointment,
			simple = false,
			empty = false,
			onClick,
			language,
			noButton = false,
			onCancel,
			onReschedule,
		} = this.props;

		return (
			<div
				className={`AppointmentCardWrapper${simple ? " --card-simple" : ""
					}`}
			>
				<div className="AppointmentDetailsWrapper">
					<div className="AppointmentDetails">
						{!empty && (
							<div className="PsychologistAvatar">
								<img
									src={
										appointment?.psychologist?.photo ||
										UserPlaceholder
									}
									alt="psychologist avatar"
								/>
							</div>
						)}
						<div className="PsychologistDetails">
							<p>{appointment?.psychologist?.name}</p>
							<div className="CardRow">
								<div className="CardRowIconWrapper">
									<Icons.Calendar smaller color="blue" />
									<p>
										{DateTime.fromISO(appointment?.date)
											.setLocale(language)
											.toFormat("dd LLLL yyyy")}
									</p>
								</div>
								<div className="CardRowIconWrapper">
									<Icons.Clock color="blue" />
									<p>
										{DateTime.fromISO(
											appointment?.date
										).toFormat("HH:mm")}
										H
									</p>
								</div>
							</div>
						</div>
					</div>
					{!noButton ? (
						<div className="AppointmentVideoContainer">
							<button
								onClick={() => {
									if (typeof onClick === "function") {
										onClick();
									}
								}}
								className="VideoIconWrapper"
							>
								{empty ? <Icons.Arrow /> : <Icons.Camera />}
							</button>
						</div>
					) : (
						<div className="AppointmentVideoContainer" />
					)}
				</div>
				<div className="AppointmentOptions">
					<Popconfirm
						placement="top"
						title={strings.appointments.cancelAppointment}
						onConfirm={() => {
							if (typeof onCancel === 'function') {
								onCancel();
							}
						}}
						okText={strings.generic.yes}
						cancelText={strings.generic.no}
					>
						<button className="AppointmentOption">
							{strings.appointments.cancel}
						</button>
					</Popconfirm>
					<button
						className="AppointmentOption --primary"
						onClick={() => {
							if (typeof onReschedule === 'function') {
								onReschedule();
							}
						}}
					>
						{strings.appointments.reschedule}
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(AppointmentCard);
