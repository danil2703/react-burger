import { describe, it, expect } from 'vitest';
import {
	closeIngredientModal,
	ingredientsModalSlice,
	openIngredientModal,
} from './ingredients-modal';
import { mockBun } from '../burger-constructor/burger-constructor.test';

describe('Ingredients Modal Slice', () => {
	it('Open Ingredients Modal', () => {
		const initialState = ingredientsModalSlice.getInitialState();
		const action = {
			type: openIngredientModal.type,
			payload: mockBun,
		};
		const state = ingredientsModalSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			modalData: mockBun,
		});
	});

	it('Close Ingredients Modal', () => {
		const initialState = ingredientsModalSlice.getInitialState();
		const action = {
			type: closeIngredientModal.type,
		};
		const state = ingredientsModalSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			modalData: null,
		});
	});
});
