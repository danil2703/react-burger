import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredient.module.css';
import { useDrag } from 'react-dnd';
import { TIngredient } from '@/utils/types';
import { getCountOfIngredient } from '@/services/burger-constructor/burger-constructor';
import { RootState, useSelector } from '@/services/store';
import { DragObjectEnum } from '@/utils/enums';
import { Link, useLocation } from 'react-router-dom';

type BurgerIngredientProps = {
	ingredient: TIngredient;
};

export const BurgerIngredient = ({
	ingredient,
}: BurgerIngredientProps): React.JSX.Element => {
	const { _id, image, price, name } = ingredient;
	const location = useLocation();

	const count = useSelector((state: RootState) =>
		getCountOfIngredient(state, _id)
	);

	const [, drag] = useDrag(() => ({
		type: DragObjectEnum.INGREDIENT,
		item: ingredient,
	}));

	return (
		<Link
			className={styles.link}
			key={_id}
			to={`/ingredients/${_id}`}
			state={{ background: location }}>
			<article ref={drag} className={styles.ingredient}>
				{count > 0 && <Counter count={count} />}
				<img src={image} alt={name} />
				<div
					className={`${styles.ingredient_price} text text_type_digits-default mb-1 mt-1`}>
					{price}
					<CurrencyIcon className='ml-2' type='primary' />
				</div>
				<div
					className={`${styles.ingredient_name} text text_type_main-default`}>
					{name}
				</div>
			</article>
		</Link>
	);
};
