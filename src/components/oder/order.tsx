import React, { useMemo } from 'react';
import styles from './order.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { OrderStatusText, OrderT } from '@/utils/types';
import { selectIngredientsByIds } from '@/services/ingredients-api/ingredients-api';
import { RootState, useSelector } from '@/services/store';
import { OrderStatus } from '@/utils/enums';

type OrderProps = {
	order: OrderT;
	showStatus?: boolean;
};

const MAX_INGREDIENT_LENGTH = 6;

export const Order = ({
	order,
	showStatus = false,
}: OrderProps): React.JSX.Element | null => {
	const location = useLocation();
	const allIngredients = useSelector((state: RootState) =>
		selectIngredientsByIds(state, order.ingredients)
	);

	const sum = useMemo<number>(
		() =>
			allIngredients.reduce(
				(curr, ingredient) => curr + (ingredient?.price || 0),
				0
			),
		[allIngredients]
	);

	const ingredients = allIngredients.slice(0, 6).reverse();

	return (
		<Link
			to={`/feed/${order.number}`}
			state={{ background: location }}
			className={`${styles.order} p-6`}>
			<div className={styles.order_header}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.updatedAt)} />
				</span>
			</div>
			<div className='text text_type_main-medium mt-6'>{order.name}</div>
			{showStatus && (
				<div
					className={`text text_type_main-default mt-2 ${order.status === OrderStatus.DONE ? 'status-complete' : ''}`}>
					{OrderStatusText[order.status]}
				</div>
			)}
			<div className={`${styles.order_footer} mt-6`}>
				<div className={styles.ingredients}>
					{ingredients.map((ingredient, index) => (
						<div className={styles.ingredient} key={index}>
							<div className={styles.ingredient__image_wrap}>
								<img
									className={styles.ingredient__image}
									src={ingredient?.image}
									alt=''
								/>
								{order.ingredients?.length > MAX_INGREDIENT_LENGTH &&
									index === 0 && (
										<div
											className={`${styles.ingredient_counter} text text_type_main-small`}>
											+{order.ingredients.length - MAX_INGREDIENT_LENGTH}
										</div>
									)}
							</div>
						</div>
					))}
				</div>

				<div className={`${styles.price} text text_type_digits-default`}>
					{sum} <CurrencyIcon className={'ml-2'} type='primary' />
				</div>
			</div>
		</Link>
	);
};
