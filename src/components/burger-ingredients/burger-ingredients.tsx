import React, { useCallback, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsGroup } from '../burger-ingredients-group/burger-ingredients-group';
import { useSelector } from 'react-redux';
import {
	getBunIngredients,
	getSauceIngredients,
	getToppingIngredients,
} from '@/services/ingredients-api/ingredients-api';

export const BurgerIngredients = (): React.JSX.Element => {
	const [activeTab, setActiveTab] = useState(0);
	const bunsTitleRef = useRef<HTMLHeadingElement>(null!);
	const saucesTitleRef = useRef<HTMLHeadingElement>(null!);
	const toppingsTitleRef = useRef<HTMLHeadingElement>(null!);
	const tabRef = useRef<HTMLUListElement>(null!);

	const buns = useSelector(getBunIngredients);
	const toppings = useSelector(getToppingIngredients);
	const sauces = useSelector(getSauceIngredients);

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
					ingredients={buns}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					ref={saucesTitleRef}
					title='Соусы'
					ingredients={sauces}></BurgerIngredientsGroup>
				<BurgerIngredientsGroup
					ref={toppingsTitleRef}
					title='Начинки'
					ingredients={toppings}></BurgerIngredientsGroup>
			</div>
		</section>
	);
};
