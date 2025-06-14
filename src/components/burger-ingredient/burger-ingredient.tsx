import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredient.module.css';

type BurgerIngredientProps = {
	_id: string;
	name: string;
	price: number;
	image: string;
	count: number;
	onClick?: (_id: string) => void;
};

export const BurgerIngredient = ({
	_id,
	name,
	price,
	image,
	count,
	onClick,
}: BurgerIngredientProps): React.JSX.Element => {
	return (
		<article onClick={() => onClick?.(_id)} className={styles.ingredient}>
			{count && <Counter count={count} />}
			<img src={image} alt={name} />
			<div
				className={`${styles.ingredient_price} text text_type_digits-default mb-1 mt-1`}>
				{price}
				<CurrencyIcon className='ml-2' type='primary' />
			</div>
			<div className={`${styles.ingredient_name} text text_type_main-default`}>
				{name}
			</div>
		</article>
	);
};
