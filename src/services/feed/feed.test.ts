import { describe, it, expect } from 'vitest';
import { feedSlice } from './feed';
import { feedOnMessage } from './actions';

const mockFeed = {
	orders: [{ name: 'Тест' }, { name: 'Тест2' }],
	total: 355,
	totalToday: 55,
};

describe('Feed Slice', () => {
	it('Feed get message success', () => {
		const initialState = feedSlice.getInitialState();
		const action = {
			type: feedOnMessage.type,
			payload: mockFeed,
		};
		const state = feedSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			orders: mockFeed.orders,
			total: mockFeed.total,
			totalToday: mockFeed.totalToday,
		});
	});
});
