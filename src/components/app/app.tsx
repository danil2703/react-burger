import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Preloader } from '../preloader/preloader';
import { TIngredient } from '@/utils/types';
import { INGREDIENTS_API } from '@/utils/constants';

export const App = (): React.JSX.Element => {
	const [ingredients, setIngredients] = useState<TIngredient[]>();

	useEffect(() => {
		fetch(INGREDIENTS_API)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка ${res.status}`);
			})
			.then(({ data }) => {
				setIngredients(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />

			{!ingredients ? (
				<Preloader />
			) : (
				<>
					<h1
						className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
						Соберите бургер
					</h1>
					<main className={`${styles.main} pl-5 pr-5`}>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor ingredients={ingredients} />
					</main>
				</>
			)}
		</div>
	);
};

export default App;
