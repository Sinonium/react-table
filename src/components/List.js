import React from 'react';
import {
	useFilters,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';
import { DefaultColumnFilter } from './filter';

const List = ({ columns, data }) => {
	const filterTypes = React.useMemo(
		() => ({
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue)
								.toLowerCase()
								.startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[]
	);

	const defaultColumn = React.useMemo(
		() => ({
			Filter: DefaultColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		visibleColumns,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			filterTypes,
		},
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<>
									<th
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' 🔽'
													: ' 🔼'
												: ''}
										</span>
										<div onClick={(e) => e.stopPropagation()} className='filter-input'>
											{column.canFilter
												? column.render('Filter')
												: null}
										</div>
									</th>
								</>
							))}
						</tr>
					))}
					<tr>
						<th
							colSpan={visibleColumns.length}
							style={{
								textAlign: 'left',
							}}>
						</th>
					</tr>
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>
											{cell.render('Cell')}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='pagination'>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						type='number'
						defaultValue={pageIndex + 0}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}>
					{[10, 25, 50, 100].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</>
	);
};

export default List;
