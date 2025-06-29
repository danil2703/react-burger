import React from 'react';
import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
	return (
		<>
			<div className={`${styles.order_number} text text_type_digits-large`}>
				034536
			</div>

			<p className='text text_type_main-medium mt-8 mb-15'>
				идентификатор заказа
			</p>

			<img
				src='public/success.svg'
				width={120}
				height={120}
				alt='Заказ прошел успешно'
			/>

			<div className='text text_type_main-default mb-20'>
				<p className='mb-2 mt-15'>Ваш заказ начали готовить</p>
				<p className='text_color_inactive mt-2'>
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</>
	);
};
