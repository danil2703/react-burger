import { configureStore } from '@reduxjs/toolkit';
import burgerConstructoReducer from './burger-constructor/burger-constructor';
import ingredientsModalReducer from './ingredients-modal/ingredients-modal';
import { rtkQueryErrorLogger } from './error-logger';
import { ingredientsApi } from './ingredients-api/ingredients-api';
import { useDispatch } from 'react-redux';
import userReducer from './user/user';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		ingredientsModal: ingredientsModalReducer,
		burgerConstructor: burgerConstructoReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			rtkQueryErrorLogger,
			ingredientsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;

// from https://redux.js.org/usage/usage-with-typescript#define-typed-hooks;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch: () => AppDispatch = useDispatch;
