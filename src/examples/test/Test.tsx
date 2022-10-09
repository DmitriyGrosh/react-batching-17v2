import React, { ChangeEvent, FormEvent, useState } from "react";
import { getCountries, getFields, setRegister } from "../../sources";

interface IValues {
	country?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	state?: string;
	city?: string;
	phone?: string;
	password?: string;
	confirm?: string;
}

const Test = () => {
	const [countries, setCountries] = useState<string[]>([]);
	const [countryLoading, setCountryLoading] = useState<boolean>(false);
	const [values, setValues] = useState<IValues>({});
	const [fields, setFields] = useState<string[]>([]);
	const [countryError, setCountryError] = useState<boolean>(false);
	const [fieldsError, setFieldsError] = useState<string[]>([]);
	const [submitError, setSubmitError] = useState<boolean>(false);
	const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);
	const [currentFocus, setCurrentFocus] = useState<string>('email');
	const [isDirty, setIsDirty] = useState<boolean>(false);

	const selectInitCountries = async () => {
		if (!countries.length) {
			setCountryLoading(true);
			try {
				const data = await getCountries();
				setCountries(data);
				setCountryLoading(false);
			} catch (e: unknown) {
				setCountryError(true);
				setCountryLoading(false);
			}
		}
	};

	const onFocus = (focus: keyof IValues) => {
		setCurrentFocus(focus);
	};

	const selectCountry = async (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		setValues((prev) => ({
			...prev,
			country: value,
		}));
		const data = await getFields(value);

		data.forEach((field) => {
			setValues((prev) => ({
				...prev,
				[field]: '',
			}))
		});

		setFields(data);
		setSubmitEnabled(true);
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, type: keyof IValues) => {
		const { value } = event.target;

		setValues((prev) => ({
			...prev,
			[type]: value,
		}));
	};

	const validate = () => {
		const data: [string, string][] = Object.entries(values);
		let isValidate = false;

		// достаточно спорный момент, можно не вызывать на каждый элемент setState,
		// но здесь очень классный яркий пример кода,
		// где можно не обратить внимание на вызов setState внутри циклов

		return new Promise((resolve) => {
			setTimeout(() => {
				data.forEach((el) => {
					const key = el[0];
					const value = el[1];

					if (!!value) {
						setFieldsError((prev) => prev.filter((el) => el !== key));
						isValidate = true;
					} else {
						setFieldsError((prev) => prev.includes(key) ? prev : [...prev, key]);
						isValidate = false;
					}
				});

				resolve(isValidate);
			}, 0);
		});
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();
			setIsDirty(true);
			setSubmitLoading(true);

			const isValidate = await validate();

			if (isValidate) {
				const data = await setRegister<IValues>(values);
				setSubmitLoading(!data);
			} else {
				setSubmitLoading(false);
			}
		} catch (e: unknown) {
			setSubmitError(true);
			setSubmitLoading(e as boolean);
		}
	};

	console.log('===> render');
	return (
		<form
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px'}}
			onSubmit={handleSubmit}
		>
			<select
				onClick={selectInitCountries}
				onChange={selectCountry}
			>
				<option>{countryLoading ? 'loading...' : ''}</option>
				{countries.map((country) => (
					<option value={country} key={country}>{country}</option>
				))}
			</select>
			{countryError && <span>error</span>}
			<input
				onFocus={() => onFocus('email')}
				onChange={(event) => handleChangeInput(event, 'email')}
				disabled={!fields.includes('email')}
				name="email"
				placeholder="email"
				type="email"
				autoFocus={currentFocus === 'email'}
			/>
			{fieldsError.includes('email') && (<span>enter email</span>)}
			<input
				onFocus={() => onFocus('firstName')}
				onChange={(event) => handleChangeInput(event, 'firstName')}
				disabled={!fields.includes('firstName')}
				placeholder="firstName"
				type="text"
				autoFocus={currentFocus === 'firstName'}
			/>
			{fieldsError.includes('firstName') && (<span>enter first name</span>)}
			<input
				onFocus={() => onFocus('lastName')}
				onChange={(event) => handleChangeInput(event, 'lastName')}
				disabled={!fields.includes('lastName')}
				placeholder="lastName"
				type="text"
				autoFocus={currentFocus === 'lastName'}
			/>
			{fieldsError.includes('lastName') && (<span>enter last name</span>)}
			<input
				onFocus={() => onFocus('state')}
				onChange={(event) => handleChangeInput(event, 'state')}
				disabled={!fields.includes('state')}
				placeholder="state"
				type="text"
				autoFocus={currentFocus === 'state'}
			/>
			{fieldsError.includes('state') && (<span>enter state</span>)}
			<input
				onFocus={() => onFocus('city')}
				onChange={(event) => handleChangeInput(event, 'city')}
				disabled={!fields.includes('city')}
				placeholder="city"
				type="text"
				autoFocus={currentFocus === 'city'}
			/>
			{fieldsError.includes('city') && (<span>enter city</span>)}
			<input
				onFocus={() => onFocus('phone')}
				onChange={(event) => handleChangeInput(event, 'phone')}
				disabled={!fields.includes('phone')}
				placeholder="phone"
				type="tel"
				autoFocus={currentFocus === 'phone'}
			/>
			{fieldsError.includes('phone') && (<span>enter phone</span>)}
			<input
				onFocus={() => onFocus('password')}
				onChange={(event) => handleChangeInput(event, 'password')}
				disabled={!fields.includes('password')}
				placeholder="password"
				type="password"
				autoFocus={currentFocus === 'password'}
			/>
			{fieldsError.includes('password') && (<span>enter password</span>)}
			<input
				onFocus={() => onFocus('confirm')}
				onChange={(event) => handleChangeInput(event, 'confirm')}
				disabled={!fields.includes('confirm')}
				placeholder="confirm"
				type="password"
				autoFocus={currentFocus === 'confirm'}
			/>
			{fieldsError.includes('confirm') && (<span>enter confirm</span>)}
			<button disabled={!submitEnabled} type="submit">отправить</button>
			{submitLoading && (<span>Submit Loading...</span>)}
			{submitError && (<span>Что-то пошло не так</span>)}
		</form>
	);
};

export default Test;
