import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountries, getUsersData } from "../sources";

import { IAddittionalSearch, IUser } from "../interfaces";

interface IUsersSlice {
	isLoading: boolean;
	data: IUser[];
	activePage: number;
	lastPage: number;
	countries: string[];
}

const initialState: IUsersSlice = {
	isLoading: false,
	data: [],
	activePage: 1,
	lastPage: 1,
	countries: [],
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		updateActivePage(state, action) {
			state.activePage = action.payload;
		},
	},
	extraReducers: ((builder) => {
		builder
			.addCase(getReduxCountries.fulfilled, (state, action) => {
			state.countries = action.payload;
		})
			.addCase(getReduxUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReduxUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload.users;
				state.lastPage = action.payload.lastPage;
			})
	}),
});

export const getReduxCountries = createAsyncThunk('users/countries', async () => {
	return await getCountries();
});

export const getReduxUsers = createAsyncThunk('users/pagination', async ({ activePage, pagesAddittionalSearch }: { activePage: number, pagesAddittionalSearch: IAddittionalSearch }) => {
	return await getUsersData(activePage, pagesAddittionalSearch);
})

export const { updateActivePage } = usersSlice.actions;

export default usersSlice.reducer;
