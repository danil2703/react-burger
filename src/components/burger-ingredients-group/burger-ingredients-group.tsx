import React from 'react';
import styles from './burger-ingredients-group.module.css';
import { TIngredient, TIngredientCount } from '@utils/types.ts';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
	title: string;
	ingredientsCount?: TIngredientCount[];
};

export const BurgerIngredientsGroup = ({
	ingredients,
	title,
	ingredientsCount = [],
}: TBurgerIngredientsProps): React.JSX.Element => {
	return (
		<li className={`${styles.ingredients_group_item} mb-10`}>
			<h3 className='text text_type_main-medium mb-6'>{title}</h3>
			<div className={styles.ingredients_group}>
				{ingredients.map((ingredient) => {
					return (
						<BurgerIngredient
							price={ingredient.price}
							name={ingredient.name}
							image={ingredient.image}
							_id={ingredient._id}
							ingredientsCount={ingredientsCount}
						/>
					);
				})}
			</div>
		</li>
	);
};
