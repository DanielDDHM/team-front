/*
 *
 * Profile
 *
 */

import React from "react";
import { connect } from "react-redux";
import { setBreadcrumb, setUser } from "store/actions";
import { Helmet } from "react-helmet";
import { Col, notification, Row } from "antd";
import { Icon } from "components";
import { TextField } from "@material-ui/core";
import { API, Endpoints } from "utils/api";
import Dropzone from "react-dropzone";
import Compressor from "compressorjs";
import { RotateSpinner } from "react-spinners-kit";
import { parseLinks } from "utils/utils";
import Strings from "utils/strings";

import ProfileImagePlaceholder from "assets/images/placeholders/user2x.jpg";
import "./styles.scss";

export class Profile extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			name: props.user.name,
			email: props.user.email,
			phone: props.user.phone,
			photo: props.user.photo,

			password: "",
			newPassword: "",
			repeatNewPassword: "",

			generalChanged: false,
			passwordChanged: false,
			savingProfile: false,
			savingPassword: false,

			isMobile: window.innerWidth < 992,
		};

		this.handleResize = this.handleResize.bind(this);
		this.onDrop = this.onDrop.bind(this);
		window.addEventListener("resize", this.handleResize);
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setBreadcrumb(() => ({
			locations: [
				{
					text: Strings.sidebar.profile,
					route: parseLinks('/profile'),
				}
			]
		})))
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	handleResize() {
		this.setState({ isMobile: window.innerWidth < 992 });
	}

	profileIsValid() {
		const { name } = this.state;

		if (!name || !name.trim()) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.nameIsEmpty,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		return true;
	}

	async saveProfile() {
		const { name, email, phone, photo } = this.state;
		const { user, dispatch } = this.props;

		if (this.profileIsValid()) {
			const body = new FormData();
			body.append('name', name);
			body.append('email', email);

			if (phone) {
				body.append('phone', phone);
			}

			if (photo) {
				body.append('photo', photo.file ? photo.file : photo);
			} else {
				body.append('photo', '');
			}

			this.setState({ savingProfile: true });

			const response = await API.put({
				url: Endpoints.uriUsers(user._id),
				data: body,
			});

			if (response.ok) {
				const { user: newUser } = response.data.results;
				dispatch(setUser({ ...newUser }));

                notification.success({
                    message: Strings.profile.header,
                    description: Strings.profile.saved,
                    placement: 'bottomRight',
                    duration: 5,
                });

				this.setState({ generalChanged: false });
			}

			this.setState({ savingProfile: false });
		}
	}

	passwordIsValid() {
		const { password, newPassword, repeatNewPassword } = this.state;

		if (!password || !password.trim() || !newPassword || !newPassword.trim() || !repeatNewPassword || !repeatNewPassword.trim()) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.pleaseFillFormCorrectly,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		if (newPassword !== repeatNewPassword) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.passwordsDontMatch,
                placement: 'bottomRight',
                duration: 5,
            });

			return false;
		}

		return true;
	}

	async changePassword() {
		const { password, newPassword } = this.state;

		if (this.passwordIsValid()) {
			const body = {
				currentPassword: password,
				password: newPassword,
			};

			this.setState({ savingPassword: true });

			const response = await API.put({
				url: Endpoints.uriUsers('change-password'),
				data: body,
			});

			if (response.ok) {
                notification.success({
                    message: Strings.profile.header,
                    description: Strings.authentication.passwordChanged,
                    placement: 'bottomRight',
                    duration: 5,
                });

				this.setState({ passwordChanged: false, password: "", newPassword: "", repeatNewPassword: "" });
			}

			this.setState({ savingPassword: false });
		}
	}

	onDrop(files: any) {
		try {
			const file = files[files.length - 1];

			new Compressor(file, {
				quality: 0.9,
				maxWidth: 400,
				mimeType: "image/jpeg",
				success: (result: any) => {
					this.getBase64(result).then((res) => {
						this.setState((state: any) => ({
							photo: { file: result, preview: res },
							generalChanged: true,
						}));
					});
				},
			});
		} catch (err) {
            notification.warn({
                message: Strings.errors.invalidFields,
                description: Strings.errors.notSupportedFile,
                placement: 'bottomRight',
                duration: 5,
            });
		}
	}

	getBase64(file: any) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	render() {
		const {
			name,
			email,
			phone,
			photo,
			password,
			newPassword,
			repeatNewPassword,
			isMobile,
			generalChanged,
			passwordChanged,
			savingProfile,
			savingPassword,
		} = this.state;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.generic.profile}</title>
					<meta name="description" content="Description of Profile" />
				</Helmet>
				<div className="ProfileContent">
					<div className="ProfileContentWrapper">
						<h1>{Strings.generic.profile}</h1>
						<Row gutter={[40, 10]}>
							<Col xs={24} lg={4}>
								{isMobile ? (
									<React.Fragment>
										<Dropzone
											accept="image/jpg, image/jpeg, image/png"
											className="ProfileImageContainer"
											onDrop={this.onDrop}
										>
											<img
												src={(photo?.preview ? photo.preview : photo) || ProfileImagePlaceholder}
												alt={Strings.placeholders.profilePic}
											/>
										</Dropzone>
										<div
											onClick={() => this.setState({ photo: '', generalChanged: true })}
											className="ProfileDeletePicture"
										>
											<span>{Strings.profile.removePicture}</span>
										</div>
									</React.Fragment>
								) : (
									<div className="ProfileImageContainer">
										<img
											src={(photo?.preview ? photo.preview : photo) || ProfileImagePlaceholder}
											alt={Strings.placeholders.profilePic}
										/>
										<div className="ProfileImageOverlay">
											<Dropzone
												accept="image/jpg, image/jpeg, image/png"
												className="ProfileImageAction"
												onDrop={this.onDrop}
											>
												<Icon
													name="pencil-outline"
													className="ProfileImageActionIcon"
												/>
											</Dropzone>
											<div
												onClick={() => this.setState({ photo: '', generalChanged: true })}
												className="ProfileImageAction"
											>
												<Icon name="trash" className="ProfileImageActionIcon" />
											</div>
										</div>
									</div>
								)}
							</Col>
							<Col xs={24} lg={10}>
								<div className="ProfileGeneralInfo">
									<div className="ProfileSectionTitle">
										<Icon name="user2" className="ProfileSectionIcon" />
										<span>{Strings.profile.generalInfo}</span>
									</div>
									<form
										onSubmit={(e: any) => {
											e.preventDefault();

											if (!savingProfile) {
												this.saveProfile();
											}
										}}
									>
										<TextField
											label={Strings.authentication.name}
											type="text"
											value={name}
											onChange={(e: any) =>
												this.setState({ name: e.target.value, generalChanged: true })
											}
											className="ProfileInputClass"
											placeholder={Strings.placeholders.name}
											InputLabelProps={{
												shrink: true,
											}}
											required
										/>
										<TextField
											label={Strings.authentication.email}
											type="email"
											value={email}
											onChange={(e: any) =>
												this.setState({ email: e.target.value, generalChanged: true })
											}
											className="ProfileInputClass"
											placeholder={Strings.placeholders.email}
											InputLabelProps={{
												shrink: true,
											}}
											required
											disabled
										/>
										<TextField
											label={Strings.profile.phone}
											type="number"
											value={phone}
											placeholder="+351"
											onChange={(e: any) =>
												this.setState({ phone: e.target.value, generalChanged: true })
											}
											className="ProfileInputClass __noMargin"
											InputLabelProps={{
												shrink: true,
											}}
										/>
										<div className="ProfileButtonContainer">
											<button
												type="submit"
												disabled={!generalChanged}
												className="ProfileButtonClass"
												onClick={() => this.saveProfile()}
											>
												{savingProfile ? (
													<div className="LoadingSpinner">
														<RotateSpinner size={24} color="#FFFFFF" />
													</div>
												) : (
													Strings.generic.save
												)}
											</button>
										</div>
									</form>
								</div>
							</Col>
							<Col xs={24} lg={10}>
								<div className="ProfileGeneralInfo">
									<div className="ProfileSectionTitle">
										<Icon name="lock" className="ProfileSectionIcon" />
										<span>{Strings.authentication.changePassword}</span>
									</div>
									<form
										onSubmit={(e: any) => {
											e.preventDefault();

											if (!savingPassword) {
												this.changePassword();
											}
										}}
									>
										<TextField
											label={Strings.authentication.password}
											type="password"
											value={password}
											onChange={(e: any) =>
												this.setState({ password: e.target.value, passwordChanged: true })
											}
											className="ProfileInputClass"
											placeholder={Strings.authentication.password}
											InputLabelProps={{
												shrink: true,
											}}
											required
										/>
										<TextField
											label={Strings.authentication.newPassword}
											type="password"
											value={newPassword}
											onChange={(e: any) =>
												this.setState({ newPassword: e.target.value, passwordChanged: true })
											}
											className="ProfileInputClass"
											placeholder={Strings.authentication.newPassword}
											InputLabelProps={{
												shrink: true,
											}}
											required
										/>
										<TextField
											label={Strings.authentication.repeatPassword}
											type="password"
											value={repeatNewPassword}
											onChange={(e: any) =>
												this.setState({ repeatNewPassword: e.target.value, passwordChanged: true })
											}
											className="ProfileInputClass __noMargin"
											placeholder={Strings.authentication.repeatPassword}
											InputLabelProps={{
												shrink: true,
											}}
											required
										/>
										<div className="ProfileButtonContainer">
											<button
												type="submit"
												disabled={!passwordChanged}
												className="ProfileButtonClass"
												onClick={() => this.changePassword()}
											>
												{savingPassword ? (
													<div className="LoadingSpinner">
														<RotateSpinner size={24} color="#FFFFFF" />
													</div>
												) : (
													Strings.generic.save
												)}
											</button>
										</div>
									</form>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	user: state.user,
});

export default connect(mapStateToProps)(Profile);
