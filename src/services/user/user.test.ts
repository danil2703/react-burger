import { describe, it, expect } from 'vitest';
import { userSlice } from './user';
import { login, logout, register, updateUser } from './user-action';

const mockUser = {
	name: 'test',
	email: 'test@test.com',
};

describe('User Slice', () => {
	it('Login success', () => {
		const initialState = userSlice.getInitialState();
		const action = { type: login.fulfilled.type, payload: mockUser };
		const state = userSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		});
	});

	it('Logout success', () => {
		const initialState = {
			...userSlice.getInitialState(),
			user: mockUser,
		};
		const action = { type: logout.fulfilled.type, payload: mockUser };
		const state = userSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: null,
		});
	});

	it('Register success', () => {
		const initialState = userSlice.getInitialState();

		const action = { type: register.fulfilled.type, payload: mockUser };
		const state = userSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		});
	});

	it('Update user success', () => {
		const initialState = { ...userSlice.getInitialState(), user: mockUser };
		const newUserData = {
			user: 'changed-name',
			email: 'changed-email@email.com',
		};

		const action = { type: updateUser.fulfilled.type, payload: newUserData };
		const state = userSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			user: newUserData,
		});
	});
});
