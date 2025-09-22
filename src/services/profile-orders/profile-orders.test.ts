import { describe, it, expect } from 'vitest';
import { profileOrdersSlice } from './profile-orders';
import { profileOrdersOnMessage } from './actions';

const mockOrders = [{ name: 'test order 1' }, { name: 'test order 2' }];

describe('Profile Orders Slice', () => {
	it('Profile Orders Get Message', () => {
		const initialState = profileOrdersSlice.getInitialState();
		const action = {
			type: profileOrdersOnMessage.type,
			payload: { orders: mockOrders },
		};
		const state = profileOrdersSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orders: mockOrders,
		});
	});
});
