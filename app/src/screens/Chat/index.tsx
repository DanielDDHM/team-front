import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { setBreadcrumb } from "store/actions";
import { parseLinks } from "utils/utils";
import { DateTime } from "luxon";
import { Col, Row } from "antd";
import { Icons } from "components";

import Strings from "utils/strings";
import UserPlaceholder from "assets/images/placeholders/user2x.jpg";
// @ts-ignore
import Variables from 'styles/variables.scss';
import "./styles.scss";

class Chat extends React.Component<any, any> {
	chatContent: any;

	constructor(props: any) {
		super(props);

		this.state = {
			psychologists: [
				{
					name: "Dra Vânia Leite",
					photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					_id: 1231321,
					lastMessageDate: DateTime.utc(),
					lastMessage:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo cum cupiditate, non laudantium tempore ea obcaecati neque, molestiae laborum aspernatur exercitationem molestias voluptatum minima saepe! Consequatur magnam excepturi obcaecati rem?",
				},
				{
					name: "Dra Vânia Leite",
					photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					_id: 1231322,
					lastMessageDate: DateTime.utc(),
					lastMessage:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo cum cupiditate, non laudantium tempore ea obcaecati neque, molestiae laborum aspernatur exercitationem molestias voluptatum minima saepe! Consequatur magnam excepturi obcaecati rem?",
				},
				{
					name: "Dra Vânia Leite",
					photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
					_id: 1231323,
					lastMessageDate: DateTime.utc(),
					lastMessage:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo cum cupiditate, non laudantium tempore ea obcaecati neque, molestiae laborum aspernatur exercitationem molestias voluptatum minima saepe! Consequatur magnam excepturi obcaecati rem?",
				},
			],
			messages: [
				{
					date: '11/03/2022',
					messages: [
						{
							user: {
								_id: props.user._id,
								name: props.user.name,
							},
							message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, consequuntur quasi quo hic eius labore quis vitae rerum ratione adipisci veniam laboriosam, temporibus id cum officiis deleniti, facere suscipit culpa.",
							created: DateTime.utc(),
						},
						{
							user: {
								_id: 2,
								name: 'Dummy Staff Name'
							},
							message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, consequuntur quasi quo hic eius labore quis vitae rerum ratione adipisci veniam laboriosam, temporibus id cum officiis deleniti, facere suscipit culpa.",
							created: DateTime.utc(),
						},
					]
				},
				{
					date: '12/03/2022',
					messages: [
						{
							user: {
								_id: props.user._id,
								name: props.user.name,
							},
							message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, consequuntur quasi quo hic eius labore quis vitae rerum ratione adipisci veniam laboriosam, temporibus id cum officiis deleniti, facere suscipit culpa.",
							created: DateTime.utc().plus({ days: 1 }),
						},
						{
							user: {
								_id: props.user._id,
								name: props.user.name,
							},
							message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
							created: DateTime.utc().plus({ days: 1 }),
						},
						{
							user: {
								_id: 2,
								name: 'Dummy Staff Name'
							},
							message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, consequuntur quasi quo hic eius labore quis vitae rerum ratione adipisci veniam laboriosam, temporibus id cum officiis deleniti, facere suscipit culpa.",
							created: DateTime.utc().plus({ days: 1 }),
						},
					]
				},
			],
			selected: {
				name: "Dra Vânia Leite",
				photo: "https://s3-alpha-sig.figma.com/img/f768/5321/35941e86a58ea9b1224db1ec2178adfc?Expires=1647820800&Signature=hPJ7hyeVgg3j1zxAoYp~OF-5iYZqOvA8n2yPZiUOQTTJJatPj9cjmS4PK98M0bo6F~6Y-6jipsx5ekw0mu2eikjB1dAvRINek~8TJ8FcMD6ZakzRX0oik~ybAfYEYkRUiRM2JRxONYAf4s7U8DSM8gLJmmsdOpINeBaxs87U1qY2msgBC~dIVhppT1I78AU7nryMSOpj0iwsiOEUGtN98u2ya4zRC13zHVpb8sMwEhQudwQq7PIjtMaqAnvhwuvCXOlixm6BoZUuY8X7joZsMc7D2QXyy-R4dSJpiCO60uaCEnYpvlmGWY76fV91~MxXKsCUvPE1kNyTnCd~M5QVjg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
				_id: 1231321,
				lastMessageDate: DateTime.utc(),
				lastMessage:
					"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo cum cupiditate, non laudantium tempore ea obcaecati neque, molestiae laborum aspernatur exercitationem molestias voluptatum minima saepe! Consequatur magnam excepturi obcaecati rem?",
			},
		};
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(
			setBreadcrumb(() => ({
				locations: [
					{
						text: Strings.chat.header,
						route: parseLinks("/chat"),
					},
				],
			}))
		);
	}

	componentDidUpdate() {
		if (this.chatContent) {
			this.chatContent.scrollTop = this.chatContent.scrollHeight;
		}
	}

	render() {
		const { psychologists, selected, inputMessage, messages } = this.state;
		const { user } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.chat} | team</title>
					<meta name="description" content="Description of Chat" />
				</Helmet>
				<div className="ChatContent">
					<h1 className="GenericTitle">
						{Strings.sidebar.chat}
					</h1>
					<div className="ChatBoxWrapper">
						<div className="ChatUserListContainer">
							<div className="ChatUserListHeader"></div>
							<div className="ChatUserList">
								{psychologists.map((psychologist: any, index: number) => (
									<div
										key={`psychologist_${psychologist._id}`}
										className={`ChatUser${selected._id === psychologist._id ? " --chat-selected" : ""}`}
										onClick={() => this.setState({ selected: psychologists[index] })}
									>
										<img src={psychologist?.photo || UserPlaceholder} alt="psychologist avatar" />
										<div className="ChatUserDetails">
											<div className="ChatUserRow">
												<p>{psychologist?.name}</p>
												<p className="ChatMessageTime">
													{DateTime.fromISO(psychologist?.lastMessageDate).toFormat("HH:mm")}
												</p>
											</div>
											<p className="ChatMessage">{psychologist?.lastMessage}</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="ChatConversationContainer">
							<div className="ChatSelectedUser">
								<img src={selected?.photo || UserPlaceholder} alt="psychologist avatar" />
								<p>{selected.name}</p>
							</div>
							<div id="chatContent" ref={ref => (this.chatContent = ref)} className="ChatMessagesContainer">
								{messages?.map((day: any, index: number) => {
									const messages = day.messages;

									return (
										<React.Fragment key={`chat_day_${index}`}>
											<div className="ChatMessageNewDay">
												{day.date}
											</div>
											{messages.map((message: any, index2: number) => {
												const rightSide = message.user?._id === user._id;

												return (
													<Row key={`chat_message_${index2}`}>
														{rightSide && (
															<Col xs={{ span: 16, offset: 8 }}>
																<div style={{ textAlign: 'right' }}>
																	<span className="ChatDate">
																		{message.staff?.name} ~ 
																		{DateTime.fromISO(message.created).toFormat('HH:mm')}
																	</span>
																	<span
																		style={rightSide ? { backgroundColor: Variables.primaryColor } : {}}
																		className={`ChatEntry ${rightSide ? '--chat-me' : ''}`}
																	>
																		{message.message}
																	</span>
																</div>
															</Col>
														)}
														{!rightSide && (
															<Col xs={16}>
																<div>
																	<span className="ChatDate">
																		{DateTime.fromISO(message.created).toFormat('HH:mm')}
																	</span>
																	<span className="ChatEntry">{message.message}</span>
																</div>
															</Col>
														)}
													</Row>
												);
											})}
										</React.Fragment>
									);
								})}
							</div>
							<div className="ChatSendMessageContainer">
								<textarea
									rows={2}
									value={inputMessage || ''}
									onChange={(e: any) => this.setState({ inputMessage: e.target.value })}
									// className="chatbox-input"
									placeholder={Strings.appointments.replyMessage}
								/>
								<button className="ChatSendButton">
									<Icons.Send disabled={!inputMessage} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
	user: state.user,
});

export default connect(mapStateToProps)(Chat);
