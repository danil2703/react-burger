import React from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-cart.module.css';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { useSelector } from 'react-redux';
import {
	getIdsForOrder,
	getTotalSum,
} from '@/services/burger-constructor/burger-constructor';
import { useSendOrderMutation } from '@/services/ingredients-api/ingredients-api';

export const BurgerConstructorCart = (): React.JSX.Element => {
	const totalSum = useSelector(getTotalSum);
	const [sendOrder, { isSuccess, data, isLoading, reset }] =
		useSendOrderMutation();
	const orderIds = useSelector(getIdsForOrder);

	return (
		<>
			<div className={`${styles.constructor_cart} pt-10 pb-13`}>
				<span className={`${styles.price} text text_type_digits-medium mr-10`}>
					{totalSum}
					<CurrencyIcon
						className={`${styles.currency_icon} ml-2`}
						type='primary'
					/>
				</span>
				<Button
					onClick={() => sendOrder(orderIds)}
					htmlType='button'
					type='primary'
					disabled={isLoading}
					size='large'>
					Оформить заказ
				</Button>
			</div>
			<Modal isOpen={isSuccess} onClose={reset}>
				{isSuccess && <OrderDetails orderNumber={data.order.number} />}
			</Modal>
		</>
	);
};
