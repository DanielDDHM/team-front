/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'components';
import { setUpdater } from 'store/actions';
import './styles.scss';
import strings from 'utils/strings';
import { parseLinks } from 'utils/utils';

export type BreadcrumbType = () => {
	locations?: Array<{
		text: string;
		route?: string;
		icon?: string;
	}>;
};

export class Breadcrumb extends React.Component<
	{ breadcrumb: BreadcrumbType | null } | any
> {
	constructor(props: any) {
		super(props);

		this.state = {
			isMobile: window.innerWidth <= 768,
			visible: false,
		};

		props.dispatch(setUpdater(this.reRender.bind(this)));
		this.handleResize = this.handleResize.bind(this);
		window.addEventListener('resize', this.handleResize);
	}

	componentDidMount() {
		this.handleResize();
	}

	UNSAFE_componentWillReceiveProps(nextProps: any) {
		this.handleResize(nextProps);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleResize(props: any = null) {
		let { breadcrumb } = this.props;
		if (!breadcrumb && props) breadcrumb = props.breadcrumb

		const { mobileStyleAt } = typeof breadcrumb === 'function' && breadcrumb();

		const total = window.innerWidth;

		this.setState({ isMobile: total <= 768 || total < mobileStyleAt });
	}

	reRender() {
		this.forceUpdate();
	}

	renderLocations(locations: Array<any>) {
		if (!Array.isArray(locations) || !locations.length) return null;

		return locations.map(({ route, text, icon }, index) => (
			<React.Fragment key={`location_key_${text}`}>
				{(index === 0 && <div className='BreadcrumbSeparator' />) ||
					false}
				{Boolean(index) && (
					<div className='BreadcrumbLinkSeparator'>/</div>
				)}
				{route ? (
					<Link
						key={`location_${index}`}
						className={`BreadcrumbLink${!index ? ' __noMargin' : ''}`}
						to={route}
					>
						{(icon && <Icon name={icon} className='m10r' />) || null}
						<span>{text}</span>
					</Link>
				) : (
					<div
						key={`location_${index}`}
						className={`BreadcrumbLink${!index ? ' __noMargin' : ''}`}
					>
						{(icon && <Icon name={icon} className='m10r' />) || null}
						<span>{text}</span>
					</div>
				)}
			</React.Fragment>
		));
	}

	render() {
		const { breadcrumb } = this.props;
		const { isMobile } = this.state as any;

		let locations: Array<any> = [];
		locations = (breadcrumb && breadcrumb()?.locations) || [];

		return (
			<div
				className={`BreadcrumbContainer${Boolean(breadcrumb) ? ' __active' : ''
					}`}
			>
				<div id='BreadcrumbContent' className='Breadcrumb'>
					<div
						id='BreadcrumbLeftContent'
						className='BreadcrumbLeftSection'
					>
						<Link
							className='BreadcrumbLocation'
							style={{ lineHeight: 1.15 }}
							to={parseLinks('/home')}
						>
							<Icon
								name='house-outline'
							/>
							<p>{strings.sidebar.home}</p>
						</Link>
						{(!isMobile &&
							this.renderLocations(locations)) ||
							null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	router: state.router,
	breadcrumb: state.breadcrumb,
	updateCrumb: state.updateCrumb,
	language: state.language,
});

export default connect(mapStateToProps)(Breadcrumb);
