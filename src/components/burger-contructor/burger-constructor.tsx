import { TIngredient } from '@utils/types.ts';
import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { IngredientTypeEnum } from '@/utils/enums';
import { BurgerConstructorCart } from '../burger-constructor-cart/burger-constructor-cart';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const bun = ingredients.find(
		(ingredient) => ingredient.type === IngredientTypeEnum.BUN
	);
	const filteredIngredients = ingredients.filter(
		(ingredient) => ingredient.type !== IngredientTypeEnum.BUN
	);

	return (
		<ul className={styles.burger_constructor}>
			{bun && (
				<BurgerConstructorElement
					extraClass='mb-4'
					ingredient={bun}
					type='top'
					isLocked={true}
				/>
			)}

			<div className={styles.ingredients}>
				{filteredIngredients.map((ingredient) => {
					return (
						<BurgerConstructorElement
							key={ingredient._id}
							ingredient={ingredient}
						/>
					);
				})}
			</div>

			{bun && (
				<BurgerConstructorElement
					extraClass='mt-4'
					ingredient={bun}
					type='bottom'
					isLocked={true}
				/>
			)}
			<BurgerConstructorCart price={1257} />
		</ul>
	);
};
