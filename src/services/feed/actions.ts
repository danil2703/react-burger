import { FeedMessage } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const feedConnect = createAction<string, 'feed/connect'>('feed/connect');
export const feedDiconnect = createAction('feed/disconnect');
export const feedOnMessage = createAction<FeedMessage, 'feed/onmessage'>(
	'feed/onmessage'
);
export const feedOnError = createAction<string, 'feed/onerror'>('feed/onerror');
