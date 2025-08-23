import { createSlice } from '@reduxjs/toolkit';
import { profileOrdersOnMessage } from './actions';
import { OrderT } from '@/utils/types';

export type SocketStore = {
	orders: OrderT[] | null;
};

export const initialState: SocketStore = {
	orders: null,
};

export const profileOrdersSlice = createSlice({
	name: 'profile_orders',
	initialState,
	reducers: {},
	selectors: {
		getSelfOrders: (state) => state.orders,
	},
	extraReducers: (builder) => {
		builder.addCase(profileOrdersOnMessage, (state, action) => {
			state.orders = action.payload.orders;
		});
	},
});

export const { getSelfOrders } = profileOrdersSlice.selectors;

export default profileOrdersSlice.reducer;
