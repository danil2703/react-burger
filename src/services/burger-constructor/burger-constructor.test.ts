import { describe, it, expect } from 'vitest';
import {
	addBun,
	addIngredient,
	burgerConstructorSlice,
	cancelDrag,
	clearDragData,
	moveIngredient,
	removeIngredient,
} from './burger-constructor';
import { IngredientTypeEnum } from '@/utils/enums';
import { StoredIngredient } from '@/utils/types';

export const mockBun = {
	_id: '1',
	name: 'Булка',
	type: IngredientTypeEnum.BUN,
	proteins: 10,
	fat: 20,
	carbohydrates: 30,
	calories: 60,
	price: 100,
	image: 'empty.png',
	image_large: 'empty.png',
	image_mobile: 'empty.png',
	__v: 1,
	key: 'uniq_key',
};

const mockIngredient = {
	...mockBun,
	name: 'Сырный соус',
	type: IngredientTypeEnum.SAUCE,
};

describe('Burger Constructor Slice', () => {
	it('Add bun success', () => {
		const initialState = burgerConstructorSlice.getInitialState();
		const action = {
			type: addBun.type,
			payload: mockBun,
		};
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			bun: mockBun,
		});
	});

	it('Add ingredient success', () => {
		const initialState = burgerConstructorSlice.getInitialState();
		const action = {
			type: addIngredient.type,
			payload: mockIngredient,
		};
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			ingredients: [mockIngredient],
		});
	});

	it('Remove ingredient success', () => {
		const initialState = {
			...burgerConstructorSlice.getInitialState(),
			ingredients: [mockIngredient],
		};
		const action = {
			type: removeIngredient.type,
			payload: 'uniq_key',
		};
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			ingredients: [],
		});
	});

	it('Move Ingredient success', () => {
		const initialState = {
			...burgerConstructorSlice.getInitialState(),
			ingredients: [
				{ key: 'uniq_key1' },
				{ key: 'uniq_key2' },
				{ key: 'uniq_key3' },
			] as StoredIngredient[],
		};
		const action = {
			type: moveIngredient.type,
			payload: { fromKey: 'uniq_key3', toKey: 'uniq_key1' },
		};
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			ingredients: [
				{ key: 'uniq_key3' },
				{ key: 'uniq_key1' },
				{ key: 'uniq_key2' },
			],
			startDragElementIndex: 2,
			endDragElementIndex: 0,
		});
	});

	it('Move Ingredient success', () => {
		const initialState = {
			...burgerConstructorSlice.getInitialState(),
			ingredients: [
				{ key: 'uniq_key3' },
				{ key: 'uniq_key1' },
				{ key: 'uniq_key2' },
			] as StoredIngredient[],
			startDragElementIndex: 2,
			endDragElementIndex: 0,
		};
		const action = {
			type: cancelDrag.type,
		};
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			ingredients: [
				{ key: 'uniq_key1' },
				{ key: 'uniq_key2' },
				{ key: 'uniq_key3' },
			],
		});
	});

	it('Clear Drug Data success', () => {
		const initialState = {
			...burgerConstructorSlice.getInitialState(),
			startDragElementIndex: 2,
			endDragElementIndex: 0,
		};
		const action = { type: clearDragData.type };
		const state = burgerConstructorSlice.reducer(initialState, action);

		expect(state).toEqual({
			...initialState,
			startDragElementIndex: null,
			endDragElementIndex: null,
		});
	});
});
