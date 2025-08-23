import styles from './feed.module.css';
import { Order } from '@/components/oder/order';
import { FeedInfo } from '@/components/feed-info/feed-info';
import { feedConnect, feedDiconnect } from '@/services/feed/actions';
import { useEffect } from 'react';
import {
	getAllOrders,
	getTotalOrders,
	getTotalTodayOrders,
} from '@/services/feed/feed';
import { OrderStatus } from '@/utils/enums';
import { FEED_SOCKET_URL } from '@/utils/constants';
import { Preloader } from '@/components/preloader/preloader';
import { useDispatch, useSelector } from '@/services/store';

export const Feed = (): JSX.Element => {
	const dispatch = useDispatch();
	const orders = useSelector(getAllOrders);
	const total = useSelector(getTotalOrders);
	const totalToday = useSelector(getTotalTodayOrders);

	const lastReadyOrderNums =
		orders
			?.filter((order) => order.status === OrderStatus.DONE)
			.map((order) => order.number)
			.slice(0, 12) || [];

	const lastPendingOrderNums =
		orders
			?.filter((order) => order.status === OrderStatus.PENDING)
			.map((order) => order.number)
			.slice(0, 12) || [];

	useEffect(() => {
		dispatch(feedConnect(FEED_SOCKET_URL));
		return () => {
			dispatch(feedDiconnect());
		};
	}, [dispatch]);

	if (!orders) {
		return <Preloader />;
	}

	return (
		<div className={`${styles.container}`}>
			<h3 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h3>
			<main className={styles.main_content}>
				<ul className={`${styles.orders} pr-2`}>
					{orders.map((order) => (
						<li key={order._id} className='mb-4'>
							<Order order={order} />
						</li>
					))}
				</ul>
				<FeedInfo
					total={total}
					totalToday={totalToday}
					lastReadyOrderNums={lastReadyOrderNums}
					lastPendingOrderNums={lastPendingOrderNums}
				/>
			</main>
		</div>
	);
};
