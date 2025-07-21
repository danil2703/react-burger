import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { TIngredient } from '@/utils/types';
import { useSelector } from 'react-redux';
import { getCountOfIngredient } from '@/services/burger-constructor/burger-constructor';
import { RootState } from '@/services/store';
import { DragObjectEnum } from '@/utils/enums';

type BurgerIngredientProps = {
	ingredient: TIngredient;
	onClick?: (_id: string) => void;
};

export const BurgerIngredient = ({
	ingredient,
	onClick,
}: BurgerIngredientProps): React.JSX.Element => {
	const { _id, image, price, name } = ingredient;

	const count = useSelector((state: RootState) =>
		getCountOfIngredient(state, _id)
	);

	const [, drag] = useDrag(() => ({
		type: DragObjectEnum.INGREDIENT,
		item: ingredient,
	}));

	return (
		<article
			ref={drag}
			onClick={() => onClick?.(_id)}
			className={styles.ingredient}>
			{count > 0 && <Counter count={count} />}
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
