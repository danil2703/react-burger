import { TIngredient } from '@utils/types.ts';
import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { IngredientTypeEnum } from '@/utils/enums';
import { BurgerConstructorCart } from '../burger-constructor-cart/burger-constructor-cart';

type BurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: BurgerConstructorProps): React.JSX.Element => {
	const bun = useMemo(
		() =>
			ingredients.find(
				(ingredient) => ingredient.type === IngredientTypeEnum.BUN
			),
		[ingredients]
	);

	const filteredIngredients = useMemo(
		() =>
			ingredients.filter(
				(ingredient) => ingredient.type !== IngredientTypeEnum.BUN
			),
		[ingredients]
	);

	return (
		<ul className={styles.burger_constructor}>
			{bun && (
				<li className={`${styles.burger_constructor_li} mb-4`}>
					<BurgerConstructorElement
						ingredient={bun}
						type='top'
						isLocked={true}
					/>
				</li>
			)}

			<div className={styles.ingredients}>
				{filteredIngredients.map((ingredient) => {
					return (
						<li key={ingredient._id} className={styles.burger_constructor_li}>
							<BurgerConstructorElement ingredient={ingredient} />
						</li>
					);
				})}
			</div>

			{bun && (
				<li className={`${styles.burger_constructor_li} mt-4`}>
					<BurgerConstructorElement
						ingredient={bun}
						type='bottom'
						isLocked={true}
					/>
				</li>
			)}
			<BurgerConstructorCart price={1257} />
		</ul>
	);
};
