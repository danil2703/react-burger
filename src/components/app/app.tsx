import React from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGetIngredientsQuery } from '@/services/ingredients-api/ingredients-api';

export const App = (): React.JSX.Element => {
	const { data: ingredients, isLoading } = useGetIngredientsQuery();

	return (
		<div className={styles.app}>
			<AppHeader />
			{isLoading && <Preloader />}
			<DndProvider backend={HTML5Backend}>
				{ingredients && (
					<>
						<h1
							className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
							Соберите бургер
						</h1>
						<main className={`${styles.main} pl-5 pr-5`}>
							<BurgerIngredients ingredients={ingredients} />
							<BurgerConstructor />
						</main>
					</>
				)}
			</DndProvider>
		</div>
	);
};

export default App;
