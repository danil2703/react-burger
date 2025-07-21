import { configureStore } from '@reduxjs/toolkit';
import burgerConstructoReducer from './burger-constructor/burger-constructor';
import ingredientsModalReducer from './ingredients-modal/ingredients-modal';
import { rtkQueryErrorLogger } from './error-logger';
import { ingredientsApi } from './ingredients-api/ingredients-api';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		ingredientsModal: ingredientsModalReducer,
		burgerConstructor: burgerConstructoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			rtkQueryErrorLogger,
			ingredientsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
