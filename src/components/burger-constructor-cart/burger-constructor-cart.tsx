import React, { useState } from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-cart.module.css';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';

type BurgerConstructorCartProps = {
	price: number;
};

export const BurgerConstructorCart = ({
	price,
}: BurgerConstructorCartProps): React.JSX.Element => {
	const [isShowOrderModal, setIsShowOrderModal] = useState<boolean>(false);

	return (
		<>
			<div className={`${styles.constructor_cart} pt-10 pb-13`}>
				<span className={`${styles.price} text text_type_digits-medium mr-10`}>
					{price}
					<CurrencyIcon
						className={`${styles.currency_icon} ml-2`}
						type='primary'
					/>
				</span>
				<Button
					onClick={() => setIsShowOrderModal(true)}
					htmlType='button'
					type='primary'
					size='large'>
					Оформить заказ
				</Button>
			</div>
			<Modal
				isOpen={isShowOrderModal}
				onClose={() => setIsShowOrderModal(false)}>
				<OrderDetails />
			</Modal>
		</>
	);
};
