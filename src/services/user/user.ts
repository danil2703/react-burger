import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, updateUser } from './user-action';

type initialStateType = {
	user: {
		name: string;
		email: string;
	} | null;
	isAuthChecked: boolean;
};

const initialState: initialStateType = {
	user: null,
	isAuthChecked: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isAuthChecked = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload;
			});
	},
});

export const { getUser, getIsAuthChecked } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;

export default userSlice.reducer;
