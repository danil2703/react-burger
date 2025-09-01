import { IngredientTypeEnum, OrderStatus } from './enums';

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

export type OrderT = {
	_id: string;
	ingredients: string[];
	status: OrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
};

export const OrderStatusText: Record<OrderStatus, string> = {
	done: 'Выполнен',
	pending: 'В процессе',
	created: 'Создан',
};

export interface OrderMessage {
	orders: OrderT[];
}

export interface FeedMessage extends OrderMessage {
	total: number;
	totalToday: number;
}
