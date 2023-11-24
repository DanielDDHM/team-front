/*
 *
 * Appointments
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { setBreadcrumb } from "store/actions";
import { SimpleAppointmentCard, AppointmentCard, Icons } from "components";
import { DateTime, Duration } from "luxon";
import { parseLinks } from "utils/utils";
import { Col, ConfigProvider, DatePicker, Drawer, Row } from "antd";
import lottie from "lottie-web";
import Animation from "assets/images/lottie/calendar.json";
import moment from "moment";
import Strings from "utils/strings";
import "./styles.scss";

import pt from "antd/es/locale/pt_PT";
import en from "antd/es/locale/en_GB";
import "moment/locale/pt";

moment.updateLocale("pt", {
	week: {
		dow: 1, /// Date offset
	},
});

const { RangePicker } = DatePicker;

export class Appointments extends React.Component<any, any> {
	ref: any;

	constructor(props: any) {
		super(props);

		this.state = {
			appointments: [
				{
					psychologist: {
						name: "Dra Vânia Leite",
						photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					},
					type: "Consulta de Psicologia",
					_id: 1231321,
					date: DateTime.utc(),
				},
				{
					psychologist: {
						name: "Dra Vânia Leite",
						photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					},
					type: "Consulta de Psicologia",
					_id: 1231322,
					date: DateTime.utc(),
				},
				{
					psychologist: {
						name: "Dra Vânia Leite",
						photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					},
					type: "Consulta de Psicologia",
					_id: 1231323,
					date: DateTime.utc(),
				},
			],
			filters: {
				startDate: moment.utc().add(-7, "days"),
				endDate: moment.utc(),
			},
			showDrawer: false,
			selection: [
				{
					month: 2,
					year: 2022,
					days: [1, 2, 4, 7, 20, 30],
				},
				{
					month: 3,
					year: 2022,
					days: [1, 2, 4, 7, 20, 30],
				},
			],
			slots: [32400000, 36000000, 39600000, 43200000, 50400000, 54000000, 57600000, 61200000, 64800000],
		};

		if (props.language === "pt") {
			moment.updateLocale("pt", {
				week: {
					dow: 1, /// Date offset
				},
			});
		}
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(
			setBreadcrumb(() => ({
				locations: [
					{
						text: Strings.appointments.header,
						route: parseLinks("/appointments"),
					},
				],
			}))
		);

		this.loadAnimation();
	}

	componentDidUpdate() {
		if (this.props.language === "pt") {
			moment.updateLocale("pt", {
				week: {
					dow: 1, /// Date offset
				},
			});
		}
	}

	loadAnimation() {
		lottie.loadAnimation({
			container: this.ref,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: Animation,
		});
	}

	renderDrawer() {
		const { showDrawer } = this.state;

		return (
			<Drawer
				title={<h2 className="DrawerTitle">{Strings.appointments.schedule}</h2>}
				footer={
					<div className="DrawerFooter">
						<button
							className="DrawerFooterButton"
							onClick={() =>
								this.setState({
									tempAppointment: null,
									showDrawer: false,
								})
							}
						>
							{Strings.appointments.cancel}
						</button>
						<button className="DrawerFooterButton --btn-primary" onClick={() => { }}>
							{Strings.appointments.confirm}
						</button>
					</div>
				}
				className="drawer __singleColumn"
				width={400}
				placement="right"
				closable={true}
				visible={showDrawer}
				onClose={() => this.setState({ tempAppointment: null, showDrawer: false })}
			>
				{this.renderDrawerContent()}
			</Drawer>
		);
	}

	disabledDate = (current: any) => {
		const { selection } = this.state;
		const available = selection.some(
			(entry: any) =>
				current.year() === entry.year && current.month() === entry.month && entry.days.includes(current.date())
		);

		return !available;
	};

	renderDrawerContent() {
		const { slots, selectedSlot } = this.state;
		const { language } = this.props;

		return (
			<div className="AppointmentsDrawer">
				<Row gutter={[0, 30]}>
					<Col xs={24}>
						<label htmlFor="drawer_date" className="InputLabel --label-required">
							{Strings.appointments.selectDate}
						</label>
						<ConfigProvider locale={language === "pt" ? pt : en}>
							<DatePicker
								id="drawer_date"
								disabledDate={this.disabledDate}
								suffixIcon={<Icons.Calendar date color="blue" />}
								allowClear={false}
								style={{ width: "100%" }}
								onChange={(value: any) => this.setState({ selectedDate: value })}
							/>
						</ConfigProvider>
					</Col>
					<Col xs={24}>
						<label htmlFor="drawer_slots" className="InputLabel --label-required">
							{Strings.appointments.availableSlots}
						</label>
						<div className="DrawerSlots">
							{slots.map((slot: number, index: number) => {
								return (
									<button
										key={`slot_${slot}_${index}`}
										className={`DrawerSlot${selectedSlot === slot ? " --slot-selected" : ""}`}
										onClick={() =>
											this.setState({
												selectedSlot: slot,
											})
										}
									>
										<p>{Duration.fromMillis(slot).toFormat("hh:mm")}</p>
									</button>
								);
							})}
						</div>
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		const { appointments, filters } = this.state;
		const { language } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.appointments} | team</title>
					<meta name="description" content="Description of Appointments" />
				</Helmet>
				<div className="AppointmentsContent">
					<div className="AppointmentsMainWrapper">
						{appointments.length > 0 ? (
							<React.Fragment>
								<h1 className="GenericTitle">
									{Strings.appointments.header}
								</h1>
								<div className="CardsWrapper">
									<div className="AppointmentsDivisions">
										<div className="AppointmentsDivision">
											<h2>{Strings.home.nextAppointment}</h2>
											<AppointmentCard
												appointment={appointments[0]}
												onReschedule={() =>
													this.setState({
														showDrawer: true,
														tempAppointment: JSON.parse(JSON.stringify(appointments[0])),
													})
												}
												onCancel={() => { }}
											/>
										</div>
										<div className="AppointmentsDivision">
											<h2>{Strings.home.scheduledAppointments}</h2>
											<AppointmentCard
												noButton
												appointment={appointments[0]}
												onReschedule={() =>
													this.setState({
														showDrawer: true,
														tempAppointment: JSON.parse(JSON.stringify(appointments[0])),
													})
												}
												onCancel={() => { }}
											/>
										</div>
									</div>
								</div>
								<div className="ScheduleButton">
									<button
										onClick={() =>
											this.setState({
												showDrawer: true,
												tempAppointment: null,
											})
										}
									>
										<Icons.Calendar />
										<p>{Strings.appointments.schedule}</p>
									</button>
								</div>
							</React.Fragment>
						) : (
							<React.Fragment>
								<div className="GenericTitle">
									<p>{Strings.appointments.header}</p>
								</div>
								<div className="EmptySchedule">
									<div
										ref={(ref) => {
											this.ref = ref;
										}}
										className="errorIcon"
									/>
									<p>{Strings.appointments.noAppointments}</p>
									<div className="EmptyScheduleButton">
										<button
											onClick={() =>
												this.setState({
													showDrawer: true,
													tempAppointment: null,
												})
											}
										>
											<Icons.Calendar />
											<p>{Strings.appointments.schedule}</p>
										</button>
									</div>
								</div>
							</React.Fragment>
						)}
					</div>
					<div className="HistoryAppointmentsWrapper">
						<div className="MultiOptionTitle">
							<h2>{Strings.appointments.history}</h2>
							<button>
								<Icons.Filters />
							</button>
						</div>
						<div className="HistoryFilters">
							<ConfigProvider locale={language === "pt" ? pt : en}>
								<RangePicker
									allowEmpty={[false, false]}
									ranges={{
										[Strings.ranges.today]: [moment(), moment()],
										[Strings.ranges.thisMonth]: [
											moment().startOf("month"),
											moment().endOf("month"),
										],
										[Strings.ranges.lastMonth]: [
											moment().subtract(1, "month").startOf("month"),
											moment().subtract(1, "month").endOf("month"),
										],
										[Strings.ranges.thisYear]: [moment().startOf("year"), moment().endOf("month")],
										[Strings.ranges.lastYear]: [
											moment().subtract(1, "year").startOf("year"),
											moment().subtract(1, "year").endOf("year"),
										],
									}}
									placeholder={[Strings.fields.startDate, Strings.fields.endDate]}
									suffixIcon={<Icons.Calendar date />}
									separator="-"
									value={
										(filters?.startDate &&
											filters?.endDate && [
												moment(filters?.startDate, "YYYY-MM-DD"),
												moment(filters?.endDate, "YYYY-MM-DD"),
											]) ||
										null
									}
									onChange={(value: any) => {
										this.setState({
											filters: {
												startDate: value?.[0],
												endDate: value?.[1],
											},
										});
									}}
								/>
							</ConfigProvider>
						</div>
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
				{this.renderDrawer()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(Appointments);
