import React from 'react';
import { Empty } from 'antd';
import { UseTableInstanceProps } from 'react-table';
import { Row, TableRow } from './row';
import { Header, Footer } from './'

interface BodyProps extends UseTableInstanceProps<object> {
	paginated?: boolean;
	expanded?: boolean;
	onRowPress?: Function;
	renderEmpty?: React.ReactNode;
	renderExpanded?: React.ReactNode;
}

export class Body extends React.PureComponent<BodyProps | any> {
	get rows() {
		// @ts-ignore
		const { rows, page, paginated } = this.props;
		return paginated ? page : rows;
	}

	get isEmpty() {
		return this.rows.length === 0;
	}

	renderRow = (rowProps: TableRow) => {
		const { prepareRow, expanded, onRowPress, renderExpanded } = this.props;
		prepareRow(rowProps);
		return (
			<Row
				key={`table_row_${rowProps.id}`}
				{...rowProps}
				onPress={onRowPress}
				expandable={expanded}
				renderExpanded={renderExpanded}
			/>
		);
	};

	renderContent() {
		if (!this.isEmpty) return (
			<React.Fragment>
				<Header
					headerGroups={this.props.headerGroups}
					resizable={this.props.resizable}
					sortable={this.props.sortable}
				/>
				<div className="TableBodyRows">
					{this.rows.map(this.renderRow)}
				</div>
			</React.Fragment>);

		const { renderEmpty } = this.props;

		return <div
			className='TableBodyEmpty'
			style={{
				padding: '40px 0',
				height: '89%',
				justifyContent: 'center',
				display: 'flex',
				alignItems: 'center'}}>
			{typeof renderEmpty === 'function' ?
				renderEmpty() :
				<Empty />
			}
		</div>
	}

	render() {
		const { getTableBodyProps, isSinglePage } = this.props;

		return <>
				<div
					{...(getTableBodyProps() as any)}
					style={isSinglePage && { height: 'calc(100% - 190px)' }}
					className={`TableBody`}
				>
					{this.renderContent()}
				</div>
				{this.props.hasFiltration && (
					<Footer
						{...this.props}
						filtrationApi={this.props.filtrationApi}
						headerGroups={this.props.headerGroups}
					/>
				)}
			</>;
	}
}
