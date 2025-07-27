import React from 'react';
import styles from './ingredient-details.module.css';
import { Params, useParams } from 'react-router-dom';
import { selectIngredientById } from '@/services/ingredients-api/ingredients-api';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/store';

export const IngredientDetails = (): React.JSX.Element | null => {
	const { ingredientId } = useParams<Params>();
	const ingredient = useSelector((state: RootState) =>
		selectIngredientById(state, ingredientId || '')
	);

	if (!ingredient) {
		return null;
	}

	return (
		<div className={styles.details}>
			<img
				className={styles.image}
				src={ingredient.image_large}
				alt={ingredient.name}
			/>

			<p className='text text_type_main-medium mt-4'>{ingredient.name}</p>

			<div
				className={`${styles.callories} text text_type_main-default mt-8 mb-5`}>
				<div>
					Калории,ккал
					<div className='text_type_digits-default'>{ingredient.calories}</div>
				</div>
				<div>
					Белки, г
					<div className='text_type_digits-default'>{ingredient.proteins}</div>
				</div>
				<div>
					Жиры, г
					<div className='text_type_digits-default'>{ingredient.fat}</div>
				</div>
				<div>
					Углеводы, г
					<div className='text_type_digits-default'>
						{ingredient.carbohydrates}
					</div>
				</div>
			</div>
		</div>
	);
};
