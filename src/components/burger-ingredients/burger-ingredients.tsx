import React, { useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsGroup } from '../burger-ingredients-group/burger-ingredients-group';
import { IngredientTypeEnum } from '@/utils/enums';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

type BurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: BurgerIngredientsProps): React.JSX.Element => {
	const [openedIngredient, setOpenedIngredient] = useState<TIngredient>();

	const buns = useMemo(
		() =>
			ingredients.filter(
				(ingredient) => ingredient.type === IngredientTypeEnum.BUN
			),
		[ingredients]
	);

	const toppings = useMemo(
		() =>
			ingredients.filter(
				(ingredient) => ingredient.type === IngredientTypeEnum.TOPPING
			),
		[ingredients]
	);

	const sauces = useMemo(
		() =>
			ingredients.filter(
				(ingredient) => ingredient.type === IngredientTypeEnum.SAUCE
			),
		[ingredients]
	);

	const toggleIngredientModal = (_id: string) => {
		setOpenedIngredient(
			ingredients.find((ingredient) => ingredient._id === _id)
		);
	};

	const closeIngredientModal = () => {
		setOpenedIngredient(undefined);
	};

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
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					title='Начинки'
					ingredients={toppings}
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					title='Соусы'
					ingredients={sauces}
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
			</div>

			<Modal
				title='Детали ингредиента'
				onClose={closeIngredientModal}
				isOpen={!!openedIngredient}>
				<IngredientDetails ingredient={openedIngredient} />
			</Modal>
		</section>
	);
};
