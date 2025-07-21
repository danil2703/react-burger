import { INGREDIENTS_API } from '@/utils/constants';
import { IngredientTypeEnum } from '@/utils/enums';
import { IngredientsResponse, OrderResponse, TIngredient } from '@/utils/types';
import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ingredientsApi = createApi({
	reducerPath: 'ingredientsApi',
	baseQuery: fetchBaseQuery({ baseUrl: INGREDIENTS_API }),
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
			}),
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

export const { useGetIngredientsQuery, useSendOrderMutation } = ingredientsApi;
