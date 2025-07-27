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

export type ApiError = {
	message: string;
};

export type UserProfile = {
	name: string;
	email: string;
};

export interface ExtendedUserProfile extends UserProfile {
	password: string;
}

export type ServerResponse<T> = {
	success: boolean;
} & T;

export type PasswordConfirmResetParams = {
	password: string;
	code: string;
};

export type LoginParams = {
	email: string;
	password: string;
};

export type UserResponse = {
	accessToken: string;
	refreshToken: string;
	user: UserProfile;
};
