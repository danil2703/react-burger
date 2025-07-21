import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { BurgerConstructorCart } from '../burger-constructor-cart/burger-constructor-cart';
import { useDispatch, useSelector } from 'react-redux';
import {
	addBun,
	addIngredient,
	getBun,
	getIngredients,
} from '@/services/burger-constructor/burger-constructor';
import { BurgerConstructorDragContainer } from '../burger-constructor-drag-container/burger-constructor-drag-container';
import { useDrop } from 'react-dnd';
import { TIngredient } from '@/utils/types';
import { DragObjectEnum, IngredientTypeEnum } from '@/utils/enums';

export const BurgerConstructor = (): React.JSX.Element => {
	const bun = useSelector(getBun);
	const ingredients = useSelector(getIngredients);
	const dispatch = useDispatch();

	const [{ isBunDrag, isToppingDrag }, dropTarget] = useDrop({
		accept: DragObjectEnum.INGREDIENT,
		drop: (ingredient: TIngredient) => {
			if (ingredient.type === IngredientTypeEnum.BUN) {
				dispatch(addBun(ingredient));
			} else {
				dispatch(addIngredient(ingredient));
			}
		},
		collect: (monitor) => ({
			isBunDrag: monitor.getItem()?.type === IngredientTypeEnum.BUN,
			isToppingDrag:
				monitor.getItem()?.type === IngredientTypeEnum.SAUCE ||
				monitor.getItem()?.type === IngredientTypeEnum.TOPPING,
		}),
	});

	return (
		<ul ref={dropTarget} className={`${styles.burger_constructor}`}>
			{bun && (
				<li className={`${styles.burger_constructor_li} mb-4`}>
					<BurgerConstructorElement
						ingredient={bun}
						type='top'
						isLocked={true}
					/>
				</li>
			)}
			{!bun && (
				<li className={`${styles.burger_constructor_li} mb-4`}>
					<BurgerConstructorDragContainer canDrop={isBunDrag} type='top' />
				</li>
			)}

			<div className={styles.ingredients}>
				{ingredients?.map((ingredient) => {
					return (
						<li key={ingredient.key} className={styles.burger_constructor_li}>
							<BurgerConstructorElement
								ingredient={ingredient}
								isDragged={true}
							/>
						</li>
					);
				})}
			</div>

			{ingredients?.length === 0 && (
				<li className={`${styles.burger_constructor_li}`}>
					<BurgerConstructorDragContainer canDrop={isToppingDrag} />
				</li>
			)}

			{bun && (
				<li className={`${styles.burger_constructor_li} mt-4`}>
					<BurgerConstructorElement
						ingredient={bun}
						type='bottom'
						isLocked={true}
					/>
				</li>
			)}
			{!bun && (
				<li className={`${styles.burger_constructor_li} mt-4`}>
					<BurgerConstructorDragContainer canDrop={isBunDrag} type='bottom' />
				</li>
			)}

			<BurgerConstructorCart />
		</ul>
	);
};
