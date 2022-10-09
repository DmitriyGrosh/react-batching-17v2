import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get5000Comments } from "../sources";
import { IComment } from "../interfaces";

interface IComments {
	isLoading: boolean;
	comments: IComment[],
}

const initialState: IComments = {
	isLoading: false,
	comments: [],
}

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder => {
		builder
			.addCase(getInitialComments.pending, (state) => {
			state.isLoading = true;
			})
			.addCase(getInitialComments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
	}),
});

export const getInitialComments = createAsyncThunk('comments/initComments',async () => {
	return await get5000Comments();
});

export default commentsSlice.reducer;
