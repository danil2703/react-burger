import React from 'react';
import styles from './burger-ingredients-group.module.css';
import { TIngredient } from '@utils/types.ts';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';

type BurgerIngredientsProps = {
	ingredients: TIngredient[];
	title: string;
	onIngredientClick?: (_id: string) => void;
};

export const BurgerIngredientsGroup = ({
	ingredients,
	title,
	onIngredientClick,
}: BurgerIngredientsProps): React.JSX.Element => {
	return (
		<div className={`${styles.ingredients_group_item} mb-10`}>
			<h3 className='text text_type_main-medium mb-6'>{title}</h3>
			<div className={styles.ingredients_group}>
				{ingredients.map((ingredient) => {
					return (
						<BurgerIngredient
							key={ingredient._id}
							price={ingredient.price}
							name={ingredient.name}
							image={ingredient.image}
							_id={ingredient._id}
							count={1}
							onClick={onIngredientClick}
						/>
					);
				})}
			</div>
		</div>
	);
};
