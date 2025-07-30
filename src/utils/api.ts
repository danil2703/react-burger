import { INGREDIENTS_API } from './constants';
import {
	ApiError,
	ExtendedUserProfile,
	LoginParams,
	PasswordConfirmResetParams,
	UserProfile,
} from './types';

const checkReponse = (res: Response) => {
	return res.ok
		? res.json()
		: res.json().then((err: unknown) => Promise.reject(err));
};

const passwordReset = (email: string) => {
	return fetch(`${INGREDIENTS_API}/password-reset`, {
		method: 'POST',
		body: JSON.stringify({
			email,
		}),
	}).then((data) => checkReponse(data));
};

const passwordConfirmReset = (formData: PasswordConfirmResetParams) => {
	const { password, code } = formData;
	return fetch(`${INGREDIENTS_API}/password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify({
			password,
			code,
		}),
	}).then((data) => checkReponse(data));
};

const register = (formData: ExtendedUserProfile): Promise<UserProfile> => {
	const { email, password, name } = formData;
	return fetch(`${INGREDIENTS_API}/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			name,
			password,
		}),
	})
		.then((data) => checkReponse(data))
		.then((data) => {
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			return data.user;
		});
};

const login = (formData: LoginParams): Promise<UserProfile> => {
	const { email, password } = formData;
	return fetch(`${INGREDIENTS_API}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})
		.then((data) => checkReponse(data))
		.then((data) => {
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			return data.user;
		});
};

const logout = () => {
	const token = localStorage.getItem('refreshToken');
	return fetch(`${INGREDIENTS_API}/auth/logout`, {
		method: 'POST',
		body: JSON.stringify({
			token,
		}),
	}).then(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	});
};

const getUser = () => {
	const token = localStorage.getItem('accessToken') || '';
	return fetchWithRefresh(`${INGREDIENTS_API}/auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: token,
		},
	}).catch(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	});
};

const updateUser = (userData: ExtendedUserProfile): Promise<UserProfile> => {
	const token = localStorage.getItem('accessToken') || '';
	return fetchWithRefresh(`${INGREDIENTS_API}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: token,
		},
		body: JSON.stringify({
			...userData,
		}),
	}).then((data) => checkReponse(data));
};

export const refreshToken = () => {
	return fetch(`${INGREDIENTS_API}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(checkReponse)
		.then((refreshData) => {
			if (!refreshData.success) {
				return Promise.reject(refreshData);
			}
			localStorage.setItem('refreshToken', refreshData.refreshToken);
			localStorage.setItem('accessToken', refreshData.accessToken);
			return refreshData;
		});
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
	try {
		const res = await fetch(url, options);
		return await checkReponse(res);
	} catch (err) {
		const typedError = err as ApiError; //

		if (typedError.message === 'jwt expired') {
			const refreshData = await refreshToken();
			const reqHeaders = new Headers(options.headers);
			reqHeaders.set('authorization', refreshData.accessToken);
			options.headers = reqHeaders;
			const res = await fetch(url, options);
			return await checkReponse(res);
		} else {
			return Promise.reject(err);
		}
	}
};

export const api = {
	login,
	logout,
	getUser,
	register,
	updateUser,
	passwordReset,
	passwordConfirmReset,
};
