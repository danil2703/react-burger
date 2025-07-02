import { TIngredient } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IngredientsModalState {
	modalData: TIngredient | null;
}

const initialState: IngredientsModalState = {
	modalData: null,
};

export const ingredientsModalSlice = createSlice({
	name: 'ingredientsModal',
	initialState,
	selectors: {
		getIngredientModalData: (state) => state.modalData,
	},
	reducers: {
		openIngredientModal: (state, action: PayloadAction<TIngredient>) => {
			state.modalData = action.payload;
		},
		closeIngredientModal: (state) => {
			state.modalData = null;
		},
	},
});

export const { openIngredientModal, closeIngredientModal } =
	ingredientsModalSlice.actions;

export const { getIngredientModalData } = ingredientsModalSlice.selectors;

export default ingredientsModalSlice.reducer;
