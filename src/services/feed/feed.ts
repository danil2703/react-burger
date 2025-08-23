import { OrderStatus, WebsocketStatus } from '@/utils/enums';
import { createSlice } from '@reduxjs/toolkit';
import { feedOnMessage } from './actions';
import { OrderT } from '@/utils/types';

export type SocketStore = {
	status: WebsocketStatus;
	orders: OrderT[] | null;
	error: string | null;
	total: number;
	totalToday: number;
};

export const initialState: SocketStore = {
	status: WebsocketStatus.ONLINE,
	orders: null,
	total: 0,
	totalToday: 0,
	error: null,
};

export const feedSlice = createSlice({
	name: 'feed',
	initialState,
	reducers: {},
	selectors: {
		getAllOrders: (state) => state.orders,
		getTotalOrders: (state) => state.total,
		getTotalTodayOrders: (state) => state.totalToday,
		getLastReadyOrderNums: (state) =>
			state.orders
				?.filter((order) => order.status === OrderStatus.DONE)
				.map((order) => order.number),
	},
	extraReducers: (builder) => {
		builder.addCase(feedOnMessage, (state, action) => {
			state.orders = action.payload.orders;
			state.total = action.payload.total;
			state.totalToday = action.payload.totalToday;
		});
	},
});

export const {
	getAllOrders,
	getTotalOrders,
	getTotalTodayOrders,
	getLastReadyOrderNums,
} = feedSlice.selectors;

export default feedSlice.reducer;
