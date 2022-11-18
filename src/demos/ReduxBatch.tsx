import React, {
	SyntheticEvent,
	useCallback,
	useState,
	FC
} from 'react';
import {
	Autocomplete, AutocompleteValue,
	Box,
	CircularProgress,
	InputAdornment,
	TextField, Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";

import RenderCounter from "./RenderCounter";
import {getReduxCountries, getReduxFields, updateCountries, updateCountryError} from "../store/form";

type TField = 'email' | 'firstName' | 'lastName' | 'state' | 'city' | 'password' | 'confirm' | 'phone' | 'country';
type TValue<T> = Partial<Record<TField, T>>;

const ReduxBatch: FC<{isBatch: boolean}> = ({ isBatch}) => {
	const dispatch = useAppDispatch();
	const [refFields, setRefFields] = useState<TValue<HTMLInputElement>>({});

	const {
		countries,
		countryLoading,
		countryError,
		submitEnabled,
		submitError,
		submitLoading,
		fieldsLoading,
		nameFields,
		focusFields,
		dirtyFields,
		disabledFields,
		errorFields,
		savedFieldsLoading,
		touchedFields,
		defaultValues,
	} = useAppSelector((state) => state.form);

	const handleSelectCountry = (_event: SyntheticEvent, value: AutocompleteValue<any, any, any, any>) => {
		dispatch(getReduxFields({
			country: value,
			isBatch
		}));
	};

	const handleSearchCountries = () => {
		dispatch(getReduxCountries());
	};

	const handleBlur = () => {};
	const handleFocus = () => {};
	const handleSubmit = () => {};
	const handleChangeValue = () => {};

	const handleFormInput = useCallback((node: HTMLInputElement | null) => {
		if (node) {
			const { name } = node;

			setRefFields((prev) => ({
				...prev,
				[name]: node,
			}));
		}
	}, []);

	const isLoadingFieldOnSave = (type: TField) => {
		return savedFieldsLoading === undefined ? false : savedFieldsLoading[type];
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			component="form"
			justifyContent="center"
			alignItems="center"
			gap="20px"
			onSubmit={handleSubmit}
		>
			<Typography component="h2" variant="h2">Sign up</Typography>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<Autocomplete
					fullWidth
					onOpen={handleSearchCountries}
					onClose={() => {
						dispatch(updateCountries([]));
						dispatch(updateCountryError(false));
					}}
					getOptionLabel={(option) => option}
					onChange={handleSelectCountry}
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder="Select country"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{countryLoading ? <CircularProgress color="inherit" size={20} /> : countryError ? 'error' : null}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)}
					options={countries}
					loading={countryLoading}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					// inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('email') || disabledFields?.email}
					placeholder="email"
					value={defaultValues?.email}
					onChange={handleChangeValue}
					name="email"
					error={errorFields?.email}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('email')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('phone') || disabledFields?.phone}
					placeholder="phone"
					value={defaultValues?.phone}
					onChange={handleChangeValue}
					name="phone"
					type="tel"
					error={errorFields?.phone}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('phone')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('firstName') || disabledFields?.firstName}
					placeholder="first name"
					value={defaultValues?.firstName}
					onChange={handleChangeValue}
					name="firstName"
					error={errorFields?.firstName}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('firstName')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('lastName') || disabledFields?.lastName}
					placeholder="last name"
					value={defaultValues?.lastName}
					onChange={handleChangeValue}
					name="lastName"
					error={errorFields?.lastName}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('lastName')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('state') || disabledFields?.state}
					placeholder="state"
					value={defaultValues?.state}
					onChange={handleChangeValue}
					name="state"
					error={errorFields?.state}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('state')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('city') || disabledFields?.city}
					placeholder="city"
					value={defaultValues?.city}
					onChange={handleChangeValue}
					name="city"
					error={errorFields?.city}
					onFocus={handleFocus}
					onBlur={handleBlur}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('city')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('password') || disabledFields?.password}
					placeholder="password"
					value={defaultValues?.password}
					onChange={handleChangeValue}
					name="password"
					error={errorFields?.password}
					onFocus={handleFocus}
					onBlur={handleBlur}
					type="password"
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('password')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField
					inputRef={handleFormInput}
					fullWidth
					disabled={!nameFields.includes('confirm') || disabledFields?.confirm}
					placeholder="confirm"
					value={defaultValues?.confirm}
					onChange={handleChangeValue}
					name="confirm"
					error={errorFields?.confirm}
					onFocus={handleFocus}
					onBlur={handleBlur}
					type="password"
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{(fieldsLoading || isLoadingFieldOnSave('confirm')) && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<Box width="60%">
				<TextField
					fullWidth
					error={submitError}
					disabled={!submitEnabled}
					type="submit"
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								{submitLoading && <CircularProgress color="inherit" size={20} />}
							</InputAdornment>
						),
					}}
				>
					Отправить
				</TextField>
			</Box>
			<RenderCounter name="default" />
		</Box>
	);
};

export default ReduxBatch;
