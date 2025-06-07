import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredient.module.css';
import { TIngredientCount } from '@/utils/types';

type TBurgerIngredientProps = {
	_id: string;
	name: string;
	price: number;
	image: string;
	ingredientsCount?: TIngredientCount[];
};

export const BurgerIngredient = ({
	_id,
	name,
	price,
	image,
	ingredientsCount = [],
}: TBurgerIngredientProps): React.JSX.Element => {
	const count = ingredientsCount.find((c) => c._id === _id)?.count;

	return (
		<li className={`${styles.ingredient} mb-8`}>
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
		</li>
	);
};
