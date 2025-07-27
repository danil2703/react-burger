import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { Preloader } from '@/components/preloader/preloader';
import { useGetIngredientsQuery } from '@/services/ingredients-api/ingredients-api';
import React from 'react';
import styles from './home.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Home = (): React.JSX.Element => {
	const isLoading = useGetIngredientsQuery().isLoading;

	return (
		<>
			{isLoading ? (
				<Preloader />
			) : (
				<DndProvider backend={HTML5Backend}>
					{
						<>
							<h1
								className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
								Соберите бургер
							</h1>
							<main className={`${styles.main} pl-5 pr-5`}>
								<BurgerIngredients />
								<BurgerConstructor />
							</main>
						</>
					}
				</DndProvider>
			)}
		</>
	);
};
