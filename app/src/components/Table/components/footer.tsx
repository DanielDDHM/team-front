import React from 'react';
import { HeaderGroup } from 'react-table';
import { Input, InputNumber } from 'antd';
import { getStyles } from '../utils';
import { FiltrationApi } from '..';

const headerProps = (props: any, { column }: any) =>
	getStyles(props, column.align, column.maxWidth);

// type FilterType = Function | 'includes' | 'between' | 'equals';
type FilterType = Function | 'includes';

interface TableFooter {
	headerGroups: HeaderGroup<object>[];
	filtrationApi?: FiltrationApi;
}

export class Footer extends React.PureComponent<TableFooter, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			search: {},
		};

		this.onSearch = this.onSearch.bind(this);
	}

	componentWillReceiveProps() {
		const { filtrationApi } = this.props;

		if (filtrationApi?.defaultValues?.columnSearch)
			this.setState({ search: filtrationApi.defaultValues.columnSearch });
	}

	clearSearch() {
		this.setState({ search: {} });

		const { headerGroups, filtrationApi } = this.props;

		for (const group of headerGroups) {
			for (const column of group.headers) {
				const { canFilter, setFilter } = column as any;
				if (canFilter && typeof setFilter === 'function') {
					setFilter('');
				}
			}
		}

		if (
			!filtrationApi ||
			typeof filtrationApi.onColumnSearch !== 'function'
		)
			return;

		filtrationApi.onColumnSearch({});
	}

	onSearch(value: string | number | undefined, column: any) {
		const { filtrationApi } = this.props;
		const { id, setFilter } = column;
		const { search } = this.state;

		this.setState({ search: { ...search, [id]: value } }, () => {
			if (
				filtrationApi &&
				typeof filtrationApi.onColumnSearch === 'function'
			) {
				filtrationApi.onColumnSearch(this.state.search);
			}
		});

		if (filtrationApi) return;

		setFilter(value);
	}

	renderInput = (column: any) => {
		const { Header, filterValue, type, id } = column;
		const { search } = this.state;

		if (type === 'number') {
			return (
				<InputNumber
					value={search[id] || filterValue || ''}
					placeholder={Header}
					onChange={(value) => this.onSearch(value, column)}
					min={200}
				/>
			);
		}

		return (
			<Input
				value={search[id] || filterValue || ''}
				placeholder={Header}
				onChange={(e) => this.onSearch(e.target.value, column)}
			/>
		);
	};

	renderCol = (
		column:
			| (HeaderGroup<object> & {
					Filter?: React.ReactNode;
					filter: FilterType;
					canFilter?: boolean;
					setFilter: any;
					filterValue: any;
			  })
			| any
	) => {
		const { Filter } = column;
		const hasCustomFilter = typeof Filter === 'function';

		return (
			<div
				{...(column.getHeaderProps(headerProps) as {})}
				className='TableFooter'
			>
				{column.canFilter && (
					<React.Fragment>
						{hasCustomFilter && Filter}
						{/* {column.render('Filter')} */}
						{!hasCustomFilter && this.renderInput(column)}
						{/* {!hasCustomFilter && (
							<Input
								value={filterValue || ''}
								placeholder={column.Header}
								onChange={(e) => setFilter(e.target.value)}
							/>
						)} */}
					</React.Fragment>
				)}
			</div>
		);
	};

	render() {
		const { headerGroups } = this.props;

		return (
			<div style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', zIndex: 2 }}>
				{headerGroups.map((group: HeaderGroup<object>) => (
					<div {...(group.getHeaderGroupProps({}) as {})}>
						{group.headers.map(this.renderCol)}
					</div>
				))}
			</div>
		);
	}
}
