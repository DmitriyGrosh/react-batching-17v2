import React, {
	ChangeEvent,
	FocusEvent,
	FormEvent,
	SyntheticEvent,
	useState,
	useCallback,
} from "react";
import {
	Autocomplete,
	AutocompleteValue,
	Box,
	CircularProgress, InputAdornment,
	TextField,
} from "@mui/material";
import {
	getCountries,
	getFields2,
	setFields,
	IField,
} from "../sources";

import RenderCounter from "./RenderCounter";

type TField = 'email' | 'firstName' | 'lastName' | 'state' | 'city' | 'password' | 'confirm' | 'phone' | 'country';
type TValue<T> = Partial<Record<TField, T>>;

const Focus17DynamicForm = () => {
	const [countries, setCountries] = useState<string[]>([]);
	const [countryLoading, setCountryLoading] = useState<boolean>(false);
	const [countryError, setCountryError] = useState<boolean>(false);

	const [fieldsLoading, setFieldsLoading] = useState<boolean>(false);
	const [dirtyFields, setDirtyFields] = useState<TValue<boolean>>({});
	const [touchedFields, setTouchedFields] = useState<TValue<boolean>>({});
	const [defaultValues, setDefaultValues] = useState<TValue<string>>({});
	const [errorFields, setErrorFields] = useState<TValue<boolean>>({});
	const [focusFields, setFocusFields] = useState<TValue<boolean>>({});
	const [disabledFields, setDisabledFields] = useState<TValue<boolean>>({})
	const [nameFields, setNameFields] = useState<string[]>([]);
	const [savedFieldsLoading, setSavedFieldsLoading] = useState<TValue<boolean>>({});
	const [refFields, setRefFields] = useState<TValue<HTMLInputElement>>({});

	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<boolean>(false);
	const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

	const validate = (name: TField, value: string, isDirty?: boolean) => {
		let isValidate = false;
		const emailRegExp = /[a-zA-Z-\._]*@[a-zA-Z]*\.[a-zA-Z]*/gi;
		const passwordRexExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

		if (isDirty) {
			switch(name) {
				case 'email':
					if (emailRegExp.test(value)) {
						isValidate = true;
					}
					break;
				case 'password':
					if (passwordRexExp.test(value)) {
						isValidate = true
					}
					break;
				case 'confirm':
					if (value === defaultValues.password) {
						isValidate = true;
					}
					break;
				default:
					if (value) {
						isValidate = true;
					}
					break;
			}
		} else {
			isValidate = true;
		}

		return isValidate;
	};

	const getCurrentValues = (currentField?: TField, errorValue?: boolean) => {
		const keys = ['email', 'firstName', 'lastName', 'state', 'city', 'password', 'confirm', 'country', 'phone'];
		const data: IField[]= [];

		keys.forEach((key) => {
			const name = key as TField;

			const value: IField = {
				name,
				defaultValue: defaultValues[name] ?? '',
				dirty: dirtyFields[name] ?? false,
				touch: touchedFields[name] ?? false,
				error: currentField === name ? Boolean(errorValue) : errorFields[name] ?? false,
				focus: focusFields[name] ?? false,
				disable: disabledFields[name] ?? false,
				ref: refFields[name]
			};

			data.push(value);
		});

		return data;
	};

	const isLoadingFieldOnSave = (type: TField) => {
		return savedFieldsLoading === undefined ? false : savedFieldsLoading[type];
	};

	const handleFormInput = useCallback((node: HTMLInputElement | null) => {
		if (node) {
			const { name } = node;

			setRefFields((prev) => ({
				...prev,
				[name]: node,
			}));
		}
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		setSubmitLoading(true);
		const fields = getCurrentValues();

		try {
			await setFields(fields);
			setSubmitLoading(false);
		} catch (e: unknown) {
			setSubmitError(true);
			setSubmitLoading(false);
		}
	};

	const handleSearchCountries = async () => {
		setCountryLoading(true);
		try {
			const dataCountries = await getCountries();

			setCountries(dataCountries);
			setCountryLoading(false);
		} catch (e: unknown) {
			setCountryError(true);
			setCountryLoading(false);
		}
	};

	const handleSelectCountry = async (_event: SyntheticEvent, value: AutocompleteValue<any, any, any, any>) => {
		setFieldsLoading(true);

		const data = await getFields2();

		const dirties: TValue<boolean> = {};
		const values: TValue<string> = {
			country: value,
		};
		const touches: TValue<boolean> = {};
		const errors: TValue<boolean> = {};
		const focuses: TValue<boolean> = {};
		const disables: TValue<boolean> = {};
		const refs: TValue<HTMLInputElement> = {};
		const names: string[] = [];

		data.forEach(({ name, dirty, error, focus, touch, defaultValue, disable, ref }) => {
			const nameWithType = name as TField;

			if (focus) {
				focuses[nameWithType] = focus;
			}

			dirties[nameWithType] = dirty;
			values[nameWithType] = defaultValue;
			errors[nameWithType] = error;
			touches[nameWithType] = touch;
			disables[nameWithType] = disable;
			refs[nameWithType] = ref || refFields[nameWithType]

			names.push(name);
		});

		setDirtyFields(dirties);
		setTouchedFields(touches);
		setDefaultValues(values);
		setErrorFields(errors);
		setNameFields(names);
		setFocusFields(focuses);
		setDisabledFields(disables);
		setRefFields(refs);

		const focusesKeys = Object.keys(focuses);
		if (focusesKeys.length) {
			const type = focusesKeys[0] as TField;

			refFields[type]?.focus();
		}

		setSubmitEnabled(true);
		setFieldsLoading(false);
	};

	const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (!dirtyFields[name as TField]) {
			setDirtyFields((prev) => ({
				...prev,
				[name]: true,
			}));
		}

		setDefaultValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
		const { name } = event.target;

		setFocusFields({
			[name]: true,
		});

		setTouchedFields((prev) => ({
			...prev,
			[name]: true,
		}));
	};

	const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const isDirty = dirtyFields[name as TField];

		const isValidate = validate(name as TField, value, isDirty);
		const fields = getCurrentValues(name as TField, !isValidate);

		setSavedFieldsLoading({
			[name]: true,
		});

		// делаем вид, что после каждого заполнения поля я отправляю эти данные на сервер для того,
		// чтобы если поменять страну якобы данные сохранились и можно было продолжить на том месте,
		// где остановился в последний раз
		const isSaveFields = await setFields(fields);

		setErrorFields((prev) => ({
			...prev,
			[name]: !isValidate,
		}));
		setSavedFieldsLoading({
			[name]: !isSaveFields,
		});
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
			<Autocomplete
				fullWidth
				onOpen={handleSearchCountries}
				onClose={() => {
					setCountries([]);
					setCountryError(false);
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
			<Box width="80%" display="flex" alignItems="center" gap="20px">
				<TextField 
					inputRef={handleFormInput}
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
			<RenderCounter name="with focus" />
		</Box>
	)
};

export default Focus17DynamicForm;
