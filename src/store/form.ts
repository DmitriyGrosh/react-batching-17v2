import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountries, getFields2 } from "../sources";
import { batch } from "react-redux";

type TField = 'email' | 'firstName' | 'lastName' | 'state' | 'city' | 'password' | 'confirm' | 'phone' | 'country';
type TValue<T> = Partial<Record<TField, T>>;

interface IForm {
	countries: string[];
	countryLoading: boolean;
	countryError: boolean;
	submitLoading: boolean;
	submitError: boolean;
	submitEnabled: boolean;
	fieldsLoading: boolean;
	nameFields: string[];
	disabledFields: TValue<boolean>;
	dirtyFields: TValue<boolean>;
	touchedFields: TValue<boolean>;
	defaultValues: TValue<string>;
	errorFields: TValue<boolean>;
	focusFields: TValue<boolean>;
	savedFieldsLoading: TValue<boolean>;
}

const initialState: IForm = {
	countries: [],
	countryLoading: false,
	countryError: false,
	submitLoading: false,
	submitError: false,
	submitEnabled: false,
	fieldsLoading: false,
	nameFields: [],
	disabledFields: {},
	dirtyFields: {},
	touchedFields: {},
	defaultValues: {},
	errorFields: {},
	focusFields: {},
	savedFieldsLoading: {},
};

const formSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateCountries: (state, action) => {
			state.countries = action.payload;
		},
		updateCountryError: (state, action) => {
			state.countryError = action.payload;
		},
		setTouches: (state, action) => {
			state.touchedFields = action.payload;
		},
		setValues: (state, action) => {
			state.defaultValues = action.payload;
		},
		setDirties: (state, action) => {
			state.dirtyFields = action.payload;
		},
		setErrors: (state, action) => {
			state.errorFields = action.payload;
		},
		setFocuses: (state, action) => {
			state.focusFields = action.payload;
		},
		setDisables: (state, action) => {
			state.disabledFields = action.payload;
		},
		setNames: (state, action) => {
			state.nameFields = action.payload;
		}
	},
	extraReducers: ((builder) => {
		builder
			.addCase(getReduxCountries.pending, (state) => {
			state.countryLoading = true;
		})
			.addCase(getReduxCountries.fulfilled, (state, action) => {
				state.countries = action.payload;
				state.countryLoading = false;
			})
			.addCase(getReduxCountries.rejected, (state) => {
				state.countryError = true;
				state.countryLoading = false;
			})
			.addCase(getReduxFields.pending, (state) => {
				state.fieldsLoading = true;
			})
			.addCase(getReduxFields.fulfilled, (state, action) => {
				state.fieldsLoading = false;
				state.nameFields = action.payload;
			})
	}),
});

export const getReduxCountries = createAsyncThunk('form/countries', async () => {
	return getCountries();
});

export const getReduxFields = createAsyncThunk('form/fields', async ({ country, isBatch }: { country: string, isBatch: boolean }, { dispatch}) => {
	const fields = await getFields2();

	const dirties: TValue<boolean> = {};
	const values: TValue<string> = {
		country,
	};
	const touches: TValue<boolean> = {};
	const errors: TValue<boolean> = {};
	const focuses: TValue<boolean> = {};
	const disables: TValue<boolean> = {};
	const names: string[] = [];

	fields.forEach(({ name, dirty, error, focus, touch, defaultValue, disable }) => {
		const nameWithType = name as TField;

		if (focus) {
			focuses[nameWithType] = focus;
		}

		dirties[nameWithType] = dirty;
		values[nameWithType] = defaultValue;
		errors[nameWithType] = error;
		touches[nameWithType] = touch;
		disables[nameWithType] = disable;

		names.push(name);
	});

	if (isBatch) {
		batch(() => {
			dispatch(setDirties(dirties));
			dispatch(setValues(values));
			dispatch(setErrors(errors));
			dispatch(setTouches(touches));
			dispatch(setDisables(disables));
		});
	} else {
		dispatch(setDirties(dirties));
		dispatch(setValues(values));
		dispatch(setErrors(errors));
		dispatch(setTouches(touches));
		dispatch(setDisables(disables));
	}

	return names;
});

export const {
	updateCountryError,
	updateCountries,
	setDirties,
	setDisables,
	setErrors,
	setNames,
	setFocuses,
	setTouches,
	setValues,
} = formSlice.actions;

export default formSlice.reducer;
