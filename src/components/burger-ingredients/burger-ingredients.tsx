import React from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsGroup } from '../burger-ingredients-group/burger-ingredients-group';
import { IngredientTypeEnum } from '@/utils/enums';
import { ingredientsCount } from '@/utils/selected-ingredients';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const buns = ingredients.filter(
		(ingredient) => ingredient.type === IngredientTypeEnum.BUN
	);
	const toppings = ingredients.filter(
		(ingredient) => ingredient.type === IngredientTypeEnum.TOPPING
	);
	const sauces = ingredients.filter(
		(ingredient) => ingredient.type === IngredientTypeEnum.SAUCE
	);

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div className={styles.burger_ingredients_wrapper}>
				<BurgerIngredientsGroup
					title='Булки'
					ingredients={buns}
					ingredientsCount={ingredientsCount}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					title='Начинки'
					ingredients={toppings}
					ingredientsCount={ingredientsCount}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					title='Соусы'
					ingredients={sauces}
					ingredientsCount={ingredientsCount}></BurgerIngredientsGroup>
			</div>
		</section>
	);
};
