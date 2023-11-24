import React from 'react';
import { connect } from 'react-redux';
import { delayedDispatch, setBreadcrumb, setTitle, updateCrumb } from 'store/actions';
import { Props } from './types';
import { Helmet } from 'react-helmet';
import { ContentWrapper, Icon } from 'components';
import { Col, notification, Row } from 'antd';
import Dropzone from 'react-dropzone';
import Compressor from 'compressorjs';
import Strings from 'utils/strings';
import { translate } from 'utils/utils';
import './styles.scss';

class GalleryItem extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);

		this.state = {
			item: null,
			type: 'image',
			types: [
				{
					value: 'image',
					text: Strings.fields.image,
				},
				{
					value: 'video',
					text: Strings.gallery.video,
				},
				{
					value: 'youtube',
					text: Strings.gallery.youtube,
				}
			],
			filesToDelete: [],
			language: 'pt',
			hasUnsavedFields: false,
		}
	}

	componentDidMount() {
		const { item, types, type, language } = this.state;
		const { dispatch, match } = this.props;

		dispatch(setTitle(`${Strings.sidebar.gallery} - ${translate(item?.name) || Strings.gallery.newItem}`));

		delayedDispatch(
			setBreadcrumb(() => {
				return {
					locations: [
						{
							text: Strings.sidebar.gallery,
							route: "/gallery",
							icon: "frame",
						},
						{
							text: match.params.id === 'new' ? Strings.gallery.newItem : translate(item.name),
							icon: match.params.id === 'new' ? 'plus' : 'pencil-outline',
						},
					],
					actions: [
						{
							type: "select",
							text: Strings.gallery.type,
							value: type,
							options: types,
							onChange: (type: any) => this.setState({ type }),
							minWidth: 160,
						},
						{
							type: "language",
							value: language,
							separator: 'left',
							onChange: (lang: any) => this.setState({ language: lang }),
						},
						{
							type: "button",
							text: Strings.generic.save,
							onClick: () => { },
							disabled: !this.state.hasUnsavedFields,
							className: this.state.hasUnsavedFields ? "BreadcrumbButtonSuccess" : "",
							separator: 'left',
							isSave: true,
						},
					],
				};
			})
		);
	}

	componentDidUpdate() {
		const { item } = this.state;
		const { dispatch } = this.props;

		dispatch(updateCrumb());
		dispatch(setTitle(`${Strings.sidebar.gallery} - ${translate(item?.name) || Strings.gallery.newItem}`));
	}

	async getData() { }

	getBase64(file: any) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
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
						this.setState((prevState: any) => ({
							filesToDelete: prevState.image === 'string' ? prevState.filesToDelete.concat(prevState.image) : prevState.filesToDelete,
							image: { file: result, preview: res },
							hasUnsavedFields: true,
						}));
					});
				},
			});
		} catch (err) {
			notification.warn({
				message: Strings.errors.unsupportedFile,
				description: Strings.errors.fileNotSupported,
				placement: 'bottomRight',
				duration: 5,
			});
		}
	}

	renderImage() {
		const { image } = this.state;

		return (
			<Row gutter={[20, 20]}>
				<Col xs={24} md={12}>
					<div className="GalleryItem">
						<Dropzone
							accept="image/jpg, image/jpeg, image/png"
							className="GenericImageUpload"
							onDrop={(files: any) => this.onDrop(files)}
						>
							{image ? (
								<div
									className="GalleryItemImage"
									style={{ backgroundImage: `url('${image.preview || image}')` || 'none' }}
								/>
							) : (
								<div className={`GenericImageUploadOverlay${!image ? ' --visible' : ''}`}>
									<Icon name="frame" />
									<span>{Strings.generic.changeImage}</span>
								</div>
							)}
							{image && (
								<button
									onClick={(e: React.MouseEvent<HTMLElement>) => {
										e.stopPropagation();

										this.setState({ image: null, hasUnsavedFields: true });
									}}
									className="GenericImageDelete"
								>
									<Icon name="close" />
								</button>
							)}
						</Dropzone>
					</div>
				</Col>
			</Row>
		);
	}

	renderVideo() {
		return null;
	}

	renderYoutubeVideo() {
		return null;
	}

	render() {
		const { type } = this.state;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.sidebar.gallery}</title>
					<meta name="description" content="Description of Gallery" />
				</Helmet>
				<div className="GalleryItemScreen">
					<ContentWrapper extraStyle={{ padding: 20 }}>
						{type === 'image' && this.renderImage()}
						{type === 'video' && this.renderVideo()}
						{type === 'youtube' && this.renderYoutubeVideo()}
					</ContentWrapper>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language,
});

export default connect(mapStateToProps)(GalleryItem);