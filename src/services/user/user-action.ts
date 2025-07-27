import { api } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './user';
import { ExtendedUserProfile, LoginParams, UserProfile } from '@/utils/types';

export const login = createAsyncThunk(
	'user/login',
	async (formData: LoginParams): Promise<UserProfile> => {
		return api.login(formData);
	}
);

export const register = createAsyncThunk(
	'user/register',
	async (formData: ExtendedUserProfile): Promise<UserProfile> => {
		return api.register(formData);
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (formData: ExtendedUserProfile): Promise<UserProfile> => {
		return api.updateUser(formData);
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	api.logout();
});

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (_, { dispatch }) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			api
				.getUser()
				.then((user) => dispatch(setUser(user)))
				.finally(() => dispatch(setIsAuthChecked(true)));
		} else {
			dispatch(setIsAuthChecked(true));
		}
	}
);
