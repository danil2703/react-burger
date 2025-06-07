import React from 'react';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-cart.module.css';

type TBurgerConstructorCartProps = {
	price: number;
};

export const BurgerConstructorCart = ({
	price,
}: TBurgerConstructorCartProps): React.JSX.Element => {
	return (
		<div className={`${styles.constructor_cart} pt-10 pb-13`}>
			<span className={`${styles.price} text text_type_digits-medium mr-10`}>
				{price}
				<CurrencyIcon
					className={`${styles.currency_icon} ml-2`}
					type='primary'
				/>
			</span>
			<Button htmlType='button' type='primary' size='large'>
				Оформить заказ
			</Button>
		</div>
	);
};
