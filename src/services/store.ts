import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsModalReducer from './ingredients-modal/ingredients-modal';
import burgerConstructoReducer from './burger-constructor/burger-constructor';
import { rtkQueryErrorLogger } from './error-logger';
import { ingredientsApi } from './ingredients-api/ingredients-api';
import userReducer from './user/user';
import profileOrderReducer from './profile-orders/profile-orders';
import feedReducer from './feed/feed';
import { socketMiddleware } from './middleware/socket-middleware';
import {
	feedConnect,
	feedDiconnect,
	feedOnError,
	feedOnMessage,
} from './feed/actions';
import {
	profileOrdersConnect,
	profileOrdersDiconnect,
	profileOrdersOnError,
	profileOrdersOnMessage,
} from './profile-orders/actions';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';

const feedSocketMiddleware = socketMiddleware({
	connect: feedConnect,
	disconnect: feedDiconnect,
	onMessage: feedOnMessage,
	onError: feedOnError,
});

const profileOrdersSocketMiddleware = socketMiddleware({
	connect: profileOrdersConnect,
	disconnect: profileOrdersDiconnect,
	onMessage: profileOrdersOnMessage,
	onError: profileOrdersOnError,
});

const rootReducer = combineReducers({
	[ingredientsApi.reducerPath]: ingredientsApi.reducer,
	ingredientsModal: ingredientsModalReducer,
	burgerConstructor: burgerConstructoReducer,
	user: userReducer,
	feed: feedReducer,
	profile_orders: profileOrderReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			rtkQueryErrorLogger,
			ingredientsApi.middleware,
			feedSocketMiddleware,
			profileOrdersSocketMiddleware
		),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
