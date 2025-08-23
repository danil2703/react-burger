import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SOCKET_RECONNECT_PERIOD } from '@/utils/constants';
import { refreshToken } from '@/utils/api';

export type WSActions<M, S> = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	send?: ActionCreatorWithPayload<S>;
	onConnecting?: ActionCreatorWithoutPayload;
	onOpen?: ActionCreatorWithoutPayload;
	onClose?: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<M>;
};

export const socketMiddleware = <M, S>(
	wsActions: WSActions<M, S>,
	withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;

		const {
			connect,
			disconnect,
			send,
			onConnecting,
			onOpen,
			onClose,
			onError,
			onMessage,
		} = wsActions;

		const { dispatch } = store;
		let reconnectTimer: NodeJS.Timeout | number = 0;
		let connected = false;
		let url = '';

		return (next) => (action) => {
			if (connect.match(action)) {
				socket = new WebSocket(action.payload);
				onConnecting && dispatch(onConnecting());
				connected = true;
				url = action.payload;

				socket.onopen = () => {
					onOpen && dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Socket error'));
				};

				socket.onclose = () => {
					onClose && dispatch(onClose());

					if (connected) {
						reconnectTimer = setTimeout(() => {
							dispatch(connect(url));
						}, SOCKET_RECONNECT_PERIOD);
					}
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);

						if (
							withTokenRefresh &&
							data.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshData.accessToken.replace('Bearer', '')
									);
									dispatch(connect(wssUrl.toString()));
								})
								.catch((e) => {
									dispatch(onError((e as Error).message));
								});

							dispatch(disconnect());
							return;
						}

						dispatch(onMessage(data));
					} catch (e) {
						dispatch(onError((e as Error).message));
					}
				};

				return;
			}

			if (socket && send?.match(action)) {
				try {
					socket.send(JSON.stringify(action.payload));
				} catch (e) {
					dispatch(onError((e as Error).message));
				}

				return;
			}

			if (socket && disconnect.match(action)) {
				connected = false;
				clearTimeout(reconnectTimer);
				reconnectTimer = 0;
				socket.close();
				socket = null;
				return;
			}

			next(action);
		};
	};
};
