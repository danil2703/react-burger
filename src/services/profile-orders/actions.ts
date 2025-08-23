import { OrderMessage } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const profileOrdersConnect = createAction<
	string,
	'profileOrders/connect'
>('profileOrders/connect');
export const profileOrdersDiconnect = createAction('profileOrders/disconnect');
export const profileOrdersOnMessage = createAction<
	OrderMessage,
	'profileOrders/onmessage'
>('profileOrders/onmessage');
export const profileOrdersOnError = createAction<
	string,
	'profileOrders/onerror'
>('profileOrders/onerror');
