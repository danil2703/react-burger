import { Order } from '@/components/oder/order';
import styles from './profile-orders.module.css';
import React, { useEffect } from 'react';
import {
	profileOrdersConnect,
	profileOrdersDiconnect,
} from '@/services/profile-orders/actions';
import { ORDER_SOCKET_URL } from '@/utils/constants';
import { getSelfOrders } from '@/services/profile-orders/profile-orders';
import { Preloader } from '@/components/preloader/preloader';
import { useDispatch, useSelector } from '@/services/store';

export const ProfileOrders = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const orders = useSelector(getSelfOrders);

	useEffect(() => {
		const wssUrl = new URL(ORDER_SOCKET_URL);
		const accessToken = localStorage
			.getItem('accessToken')
			?.replace('Bearer ', '');
		wssUrl.searchParams.set('token', accessToken || '');
		dispatch(profileOrdersConnect(wssUrl.toString()));
		return () => {
			dispatch(profileOrdersDiconnect());
		};
	}, [dispatch]);

	if (!orders) {
		return <Preloader />;
	}

	return (
		<div className={styles.orders}>
			<main>
				<ul className={`${styles.orders_list} pr-2`}>
					{orders?.map((order) => (
						<li key={order._id} className='mb-4'>
							<Order order={order} showStatus={true} />
						</li>
					))}
				</ul>
			</main>
		</div>
	);
};
