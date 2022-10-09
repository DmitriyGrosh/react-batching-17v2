import React, { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";

import { getReduxCountries, getReduxUsers, updateActivePage } from "../../store/users";
import { IAddittionalSearch, TSearch } from "../../interfaces";

import UserSearch from "./UserSearch";

const HighWorkWithRedux = () => {
	const dispatch = useAppDispatch();
	const [pagesAddittionalSearch, setPagesAddittionalSearch] = useState<IAddittionalSearch>({});
	const [selectedValue, setSelectedValue] = useState<number>(0);

	const {
		isLoading,
		data,
		activePage,
		lastPage,
		countries,
	} = useAppSelector((state) => state.users);

	const handleChangeAdditionalSearch = (value: string, type: TSearch) => {
		setPagesAddittionalSearch({
			[type]: value === 'all' ? undefined : value,
		});
	};

	const handleChangeSearchValue = (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;

		setPagesAddittionalSearch({});
		setSelectedValue(Number(value));
	};

	useEffect(() => {
		dispatch(getReduxCountries());
	}, []);

	useEffect(() => {
		dispatch(getReduxUsers({ pagesAddittionalSearch, activePage }))
	}, [activePage, pagesAddittionalSearch, selectedValue]);

	console.log('==========>render');
	return (
		<>
			<select onChange={handleChangeSearchValue}>
				<option value={0}>Поиск по email</option>
				<option value={1}>Поиск по имени</option>
				<option value={2}>Поиск по статусу верификации</option>
				<option value={3}>Поиск по странам</option>
			</select>
			{selectedValue === 0 && (
				<UserSearch
					setPagesAddittionalSearch={setPagesAddittionalSearch}
					type="email"
				/>
			)}
			{selectedValue === 1 && (
				<UserSearch
					setPagesAddittionalSearch={setPagesAddittionalSearch}
					type="name"
				/>
			)}
			{selectedValue === 2 && (
				<select defaultValue="status" onChange={(event) => handleChangeAdditionalSearch(event.target.value, 'verified')}>
					<option disabled value="status">
						поиск ро статусу верификации
					</option>
					<option value="verified">verified</option>
					<option value="notVerified">not verified</option>
					<option value={undefined}>all</option>
				</select>
			)}
			{selectedValue === 3 && (
				<select onChange={(event) => handleChangeAdditionalSearch(event.target.value, 'country')}>
					{countries.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
			)}
			<table>
				<thead>
				<tr>
					<td>ID пользователя</td>
					<td>Имя</td>
					<td>Фамилия</td>
					<td>Отчестов</td>
					<td>Email адресс</td>
				</tr>
				</thead>
				{isLoading ? (
					<tbody>
					<tr><td>Loading...</td></tr>
					</tbody>
				) : (
					<tbody>
					{data.map((el, index) => (
						<tr key={index.toString(36)} className="pointer">
							<td>{el.id}</td>
							<td>{el.name || '-'}</td>
							<td>{'-'}</td>
							<td>{'-'}</td>
							<td>{el.email}</td>
							<td>
								<select value={el.verified} onChange={() => {}}>
									<option value="verified">verified</option>
									<option value="notVerified">not verified</option>
								</select>
							</td>
						</tr>
					))}
					</tbody>
				)}
			</table>
			<Pagination
				count={lastPage}
				onChange={(event, page) => dispatch(updateActivePage(page))}
			/>
		</>
	);
};

export default HighWorkWithRedux;
