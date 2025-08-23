import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-full-info.module.css';
import React, { useMemo } from 'react';
import { RootState, useSelector } from '@/services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '../preloader/preloader';
import {
	getIngredientsWithCount,
	useGetOrderByNumberQuery,
} from '@/services/ingredients-api/ingredients-api';
import { OrderStatusText } from '@/utils/types';
import { OrderStatus } from '@/utils/enums';

export const OrderFullInfo = (): React.JSX.Element => {
	const { number = '' } = useParams();

	const order = useSelector((state: RootState) => {
		let order = state.feed.orders?.find((o) => o.number === +number);

		if (order) {
			return order;
		}

		order = state.profile_orders.orders?.find((o) => o.number === +number);

		if (order) {
			return order;
		}

		return null;
	});

	const { data } = useGetOrderByNumberQuery(number, {
		skip: Boolean(order),
	});

	const ingredients = useSelector((state: RootState) =>
		getIngredientsWithCount(
			state,
			order?.ingredients || data?.ingredients || []
		)
	);

	const sum = useMemo<number>(
		() =>
			ingredients.reduce(
				(curr, { ingredient, count }) =>
					curr + (ingredient?.price * count || 0),
				0
			),
		[ingredients]
	);

	if (!order && !data) {
		return <Preloader />;
	}

	const orderData = order || data;

	return (
		<div className={styles.order}>
			<div className={`${styles.order_number} text text_type_digits-default`}>
				#{orderData?.number}
			</div>

			<div className='text text_type_main-medium mt-10'>{orderData?.name}</div>

			{orderData?.status && (
				<div
					className={`text text_type_main-small mt-3 ${orderData?.status === OrderStatus.DONE ? 'status-complete' : ''}`}>
					{OrderStatusText[orderData?.status]}
				</div>
			)}

			<div className='text text_type_main-medium mt-15'>Состав:</div>

			<ul className={`${styles.ingredient_list} pr-6`}>
				{ingredients.map(({ ingredient, count }, index) => (
					<li className={`${styles.ingredient} mb-4`} key={index}>
						<div className={styles.image_container}>
							<div className={styles.image_wrapper}>
								<img className={styles.image} src={ingredient?.image} alt='' />
							</div>
						</div>
						<div
							className={`${styles.ingredient__name} text text_type_main-default`}>
							{ingredient?.name}
						</div>

						<div className={`${styles.price} text text_type_digits-default`}>
							{count} x {ingredient?.price}{' '}
							<CurrencyIcon className={'ml-2'} type='primary' />
						</div>
					</li>
				))}
			</ul>

			<div className={`${styles.order_footer} mt-10`}>
				<div className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(orderData?.updatedAt || '')} />
				</div>
				<div className={`${styles.price} text text_type_digits-default`}>
					{sum} <CurrencyIcon className={'ml-2'} type='primary' />
				</div>
			</div>
		</div>
	);
};
