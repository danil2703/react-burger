import React, { useCallback, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsGroup } from '../burger-ingredients-group/burger-ingredients-group';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from 'react-redux';
import {
	closeIngredientModal,
	getIngredientModalData,
	openIngredientModal,
} from '@/services/ingredients-modal/ingredients-modal';
import {
	getBunIngredients,
	getSauceIngredients,
	getToppingIngredients,
} from '@/services/ingredients-api/ingredients-api';

type BurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: BurgerIngredientsProps): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState(0);
	const bunsTitleRef = useRef<HTMLHeadingElement>(null!);
	const saucesTitleRef = useRef<HTMLHeadingElement>(null!);
	const toppingsTitleRef = useRef<HTMLHeadingElement>(null!);
	const tabRef = useRef<HTMLUListElement>(null!);

	const modalState = useSelector(getIngredientModalData);
	const dispatch = useDispatch();

	const buns = useSelector(getBunIngredients);
	const toppings = useSelector(getToppingIngredients);
	const sauces = useSelector(getSauceIngredients);

	const toggleIngredientModal = useCallback(
		(_id: string) => {
			const ingredient = ingredients.find(
				(ingredient) => ingredient._id === _id
			);
			if (ingredient) {
				dispatch(openIngredientModal(ingredient));
			}
		},
		[dispatch, ingredients]
	);

	const closeModal = useCallback(() => {
		dispatch(closeIngredientModal());
	}, [dispatch]);

	const onScrollHandler = useCallback(() => {
		const tabBottomCoord = tabRef.current.getBoundingClientRect().bottom;
		const bunsCoord = Math.abs(
			tabBottomCoord - bunsTitleRef.current.getBoundingClientRect().top
		);
		const saucesCoord = Math.abs(
			tabBottomCoord - saucesTitleRef.current.getBoundingClientRect().top
		);
		const toppingsCoord = Math.abs(
			tabBottomCoord - toppingsTitleRef.current.getBoundingClientRect().top
		);

		if (bunsCoord < saucesCoord && bunsCoord < toppingsCoord) {
			return setActiveTab(0);
		}
		if (saucesCoord < bunsCoord && saucesCoord < toppingsCoord) {
			return setActiveTab(1);
		}
		if (toppingsCoord < bunsCoord && toppingsCoord < bunsCoord) {
			return setActiveTab(2);
		}
	}, []);

	return (
		<section className={styles.burger_ingredients}>
			<nav className='mb-10'>
				<ul ref={tabRef} className={styles.menu}>
					<Tab value='bun' active={activeTab === 0} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='sauce' active={activeTab === 1} onClick={() => {}}>
						Соусы
					</Tab>
					<Tab value='main' active={activeTab === 2} onClick={() => {}}>
						Начинки
					</Tab>
				</ul>
			</nav>
			<div
				onScroll={onScrollHandler}
				className={styles.burger_ingredients_wrapper}>
				<BurgerIngredientsGroup
					ref={bunsTitleRef}
					title='Булки'
					ingredients={buns}
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					ref={saucesTitleRef}
					title='Соусы'
					ingredients={sauces}
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					ref={toppingsTitleRef}
					title='Начинки'
					ingredients={toppings}
					onIngredientClick={toggleIngredientModal}></BurgerIngredientsGroup>
			</div>

			<Modal
				title='Детали ингредиента'
				onClose={closeModal}
				isOpen={!!modalState}>
				<IngredientDetails ingredient={modalState} />
			</Modal>
		</section>
	);
};
