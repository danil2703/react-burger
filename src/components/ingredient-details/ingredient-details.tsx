import React from 'react';
import styles from './ingredient-details.module.css';
import { TIngredient } from '@utils/types.ts';
import { Modal } from '../modal/modal';

type IngredientDetailsProps = {
	ingredient: TIngredient | undefined;
	onClose: () => void;
};

export const IngredientDetails = ({
	ingredient,
	onClose,
}: IngredientDetailsProps): React.JSX.Element => {
	return (
		<Modal title='Детали ингредиента' onClose={onClose} isOpen={!!ingredient}>
			{ingredient ? (
				<>
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
							<div className='text_type_digits-default'>
								{ingredient.calories}
							</div>
						</div>
						<div>
							Белки, г
							<div className='text_type_digits-default'>
								{ingredient.proteins}
							</div>
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
				</>
			) : null}
		</Modal>
	);
};
