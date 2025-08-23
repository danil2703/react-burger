import { INGREDIENTS_API } from '@/utils/constants';
import { IngredientTypeEnum } from '@/utils/enums';
import {
	IngredientsResponse,
	OrderMessage,
	OrderResponse,
	OrderT,
	TIngredient,
} from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: INGREDIENTS_API,
	}),
	endpoints: (builder) => ({
		getIngredients: builder.query<TIngredient[], void>({
			query: () => '/ingredients',
			transformResponse: (response: IngredientsResponse): TIngredient[] => {
				return response.data;
			},
		}),
		sendOrder: builder.mutation<OrderResponse, string[]>({
			query: (ingredients: string[]) => ({
				url: '/orders',
				method: 'POST',
				body: {
					ingredients,
				},
				headers: {
					Authorization: localStorage.getItem('accessToken') || '',
				},
			}),
		}),
		getOrderByNumber: builder.query<OrderT, string>({
			query: (orderNum: string) => ({ url: `orders/${orderNum}` }),
			transformResponse: (response: OrderMessage): OrderT => {
				return response.orders[0];
			},
		}),
	}),
});

export const ingredients = ingredientsApi.endpoints.getIngredients.select();

export const getBunIngredients = createSelector(
	ingredients,
	(ingredients) =>
		ingredients.data?.filter(
			(ingredient) => ingredient.type === IngredientTypeEnum.BUN
		) || []
);

export const getToppingIngredients = createSelector(
	ingredients,
	(ingredients) =>
		ingredients.data?.filter(
			(ingredient) => ingredient.type === IngredientTypeEnum.TOPPING
		) || []
);

export const getSauceIngredients = createSelector(
	ingredients,
	(ingredients) =>
		ingredients.data?.filter(
			(ingredient) => ingredient.type === IngredientTypeEnum.SAUCE
		) || []
);

export const selectIngredientById = createSelector(
	ingredients,
	(_: RootState, ingredientId: string) => ingredientId,
	(ingredients, ingredientId) =>
		ingredients.data?.find((ingredient) => ingredient._id === ingredientId)
);

export const selectIngredientsByIds = createSelector(
	ingredients,
	(_: RootState, ingredientIds: string[]) => ingredientIds,
	(ingredients, ingredientIds) =>
		ingredientIds.map((id) =>
			ingredients.data?.find((ingredient) => ingredient._id === id)
		)
);

export const getIngredientsWithCount = createSelector(
	ingredients,
	(_: RootState, ingredientIds: string[]) => ingredientIds,
	(ingredients, ingredientIds) => {
		const ingredientsMap = new Map();

		ingredientIds.forEach((id) => {
			const ingredient = ingredients.data?.find(
				(ingredient) => ingredient._id === id
			);

			if (!ingredient) {
				return;
			}

			if (ingredientsMap.has(id)) {
				ingredientsMap.set(id, {
					count: ingredientsMap.get(id).count + 1,
					ingredient,
				});
			} else {
				ingredientsMap.set(id, { count: 1, ingredient });
			}
		});

		return Array.from(ingredientsMap.values());
	}
);

export const {
	useGetIngredientsQuery,
	useGetOrderByNumberQuery,
	useSendOrderMutation,
} = ingredientsApi;
