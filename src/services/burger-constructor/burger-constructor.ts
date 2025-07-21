import { IngredientTypeEnum } from '@/utils/enums';
import { StoredIngredient, TIngredient } from '@/utils/types';
import {
	createSelector,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';

export interface BurgerConstructorState {
	ingredients: StoredIngredient[];
	bun: StoredIngredient | null;
	startDragElementIndex: number | null;
	endDragElementIndex: number | null;
}

const initialState: BurgerConstructorState = {
	ingredients: [],
	bun: null,
	startDragElementIndex: null,
	endDragElementIndex: null,
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	selectors: {
		getIngredients: (state) => state.ingredients,
		getBun: (state) => state.bun,
		getTotalSum: createSelector(
			[
				(state: BurgerConstructorState) =>
					state.ingredients.reduce((acc, ing) => acc + ing.price, 0),
				(state: BurgerConstructorState) => state.bun?.price,
			],
			(ingredientsSum, bunSum = 0) => {
				return ingredientsSum + bunSum * 2;
			}
		),
		getCountOfIngredient: createSelector(
			[
				(state: BurgerConstructorState) => state.ingredients,
				(state: BurgerConstructorState) => state.bun,
				(_, _id: string) => _id,
			],
			(ingredients, bun, _id) => {
				if (bun?._id === _id) {
					return 2;
				}

				return ingredients.filter((ingredient) => ingredient._id === _id)
					.length;
			}
		),
		getIdsForOrder: createSelector(
			[
				(state: BurgerConstructorState) => state.ingredients,
				(state: BurgerConstructorState) => state.bun,
			],
			(ingredients, bun) => {
				const resultIds = ingredients.map((ingredient) => ingredient._id);

				if (bun) {
					resultIds.splice(0, 0, bun._id);
					resultIds.push(bun._id);
				}

				return resultIds;
			}
		),
	},
	reducers: {
		addIngredient: {
			reducer: (state, action: PayloadAction<StoredIngredient>) => {
				if (action.payload.type === IngredientTypeEnum.BUN) {
					state.ingredients = [
						...burgerConstructorSlice.getSelectors().getIngredients(state),
						action.payload,
					];
				} else {
					state.ingredients.push(action.payload);
				}
			},
			prepare: (element: TIngredient) => addKeyToIngredient(element),
		},
		addBun: {
			reducer: (state, action: PayloadAction<StoredIngredient>) => {
				state.bun = action.payload;
			},
			prepare: (element: TIngredient) => addKeyToIngredient(element),
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(element) => element.key !== action.payload
			);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ fromKey?: string; toKey?: string }>
		) => {
			const { fromKey, toKey } = action.payload;
			const burgerConstructorElements = state.ingredients;

			const fromIndex = burgerConstructorElements.findIndex(
				(el) => el.key === fromKey
			);

			const toIndex = burgerConstructorElements.findIndex(
				(el) => el.key === toKey
			);

			if (fromIndex === -1 || toIndex === -1) return;

			const [movedItem] = burgerConstructorElements.splice(fromIndex, 1);
			burgerConstructorElements.splice(toIndex, 0, movedItem);

			state.ingredients = burgerConstructorElements;

			if (state.startDragElementIndex === null) {
				state.startDragElementIndex = fromIndex;
			}

			state.endDragElementIndex = toIndex;
		},
		cancelDrag: (state) => {
			if (
				state.endDragElementIndex === null ||
				state.startDragElementIndex === null
			) {
				return;
			}
			const burgerConstructorElements = state.ingredients;
			const [movedItem] = burgerConstructorElements.splice(
				state.endDragElementIndex,
				1
			);
			burgerConstructorElements.splice(
				state.startDragElementIndex,
				0,
				movedItem
			);

			state.ingredients = burgerConstructorElements;
		},
		clearDragData: (state) => {
			state.startDragElementIndex = null;
			state.endDragElementIndex = null;
		},
	},
});

const addKeyToIngredient = (element: TIngredient) => {
	return { payload: { ...element, key: nanoid() } };
};

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	cancelDrag,
	clearDragData,
	addBun,
} = burgerConstructorSlice.actions;

export const {
	getIngredients,
	getBun,
	getTotalSum,
	getCountOfIngredient,
	getIdsForOrder,
} = burgerConstructorSlice.selectors;

export default burgerConstructorSlice.reducer;
