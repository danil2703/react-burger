import { IngredientTypeEnum } from './enums';

export type TIngredient = {
	_id: string;
	name: string;
	type: IngredientTypeEnum;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export interface StoredIngredient extends TIngredient {
	key: string;
}

export interface IngredientsResponse {
	success: boolean;
	data: TIngredient[];
}

export interface OrderResponse {
	order: {
		number: number;
	};
	success: boolean;
	name: string;
}
