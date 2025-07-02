import React, { ForwardedRef, forwardRef } from 'react';
import styles from './burger-ingredients-group.module.css';
import { TIngredient } from '@utils/types.ts';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';

type BurgerIngredientsProps = {
	ingredients: TIngredient[];
	title: string;
	onIngredientClick?: (_id: string) => void;
};

export const BurgerIngredientsGroup = forwardRef(
	(
		{ ingredients, title, onIngredientClick }: BurgerIngredientsProps,
		titleRef: ForwardedRef<HTMLHeadingElement>
	): React.JSX.Element => {
		return (
			<div className={`${styles.ingredients_group_item} mb-10`}>
				<h3 ref={titleRef} className='text text_type_main-medium mb-6'>
					{title}
				</h3>
				<div className={styles.ingredients_group}>
					{ingredients.map((ingredient) => {
						return (
							<BurgerIngredient
								ingredient={ingredient}
								key={ingredient._id}
								onClick={onIngredientClick}
							/>
						);
					})}
				</div>
			</div>
		);
	}
);
