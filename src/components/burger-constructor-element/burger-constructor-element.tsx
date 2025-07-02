import { StoredIngredient } from '@utils/types.ts';
import React, { useCallback } from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { useDispatch } from 'react-redux';
import {
	cancelDrag,
	clearDragData,
	moveIngredient,
	removeIngredient,
} from '@/services/burger-constructor/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import { DragObjectEnum } from '@/utils/enums';

type BurgerConstructorElementProps = {
	ingredient: StoredIngredient;
	isLocked?: boolean;
	type?: 'top' | 'bottom';
	isDragged?: boolean;
};

export const BurgerConstructorElement = ({
	ingredient,
	type,
	isLocked = false,
	isDragged = false,
}: BurgerConstructorElementProps): React.JSX.Element => {
	const dispatch = useDispatch();

	const [, dragRef] = useDrag({
		type: DragObjectEnum.CONSTRUCTOR_ELEMENT,
		item: { key: ingredient.key },
		end: (_, monitor) => {
			const didDrop = monitor.didDrop();
			if (!didDrop) {
				dispatch(cancelDrag());
			}
			dispatch(clearDragData());
		},
	});

	const [, dropTarget] = useDrop({
		accept: DragObjectEnum.CONSTRUCTOR_ELEMENT,
		hover({ key }: { key: string }) {
			checkSorting(key, ingredient.key);
		},
		drop({ key }: { key: string }) {
			checkSorting(key, ingredient.key);
		},
	});

	const checkSorting = useCallback(
		(fromKey: string, toKey: string) => {
			if (fromKey !== toKey) {
				dispatch(moveIngredient({ fromKey, toKey }));
			}
		},
		[dispatch]
	);

	const remove = useCallback(() => {
		dispatch(removeIngredient(ingredient.key));
	}, [dispatch, ingredient]);

	let ingredientName = ingredient.name;

	if (type === 'top') {
		ingredientName += ' (верх)';
	} else if (type === 'bottom') {
		ingredientName += ' (низ)';
	}

	return (
		<div ref={(node) => (isDragged ? dragRef(dropTarget(node)) : null)}>
			{!isLocked && <DragIcon className={styles.lock_icon} type='primary' />}
			<ConstructorElement
				extraClass='ml-8'
				key={ingredient._id}
				text={ingredientName}
				thumbnail={ingredient.image}
				price={ingredient.price}
				isLocked={isLocked}
				type={type}
				handleClose={remove}
			/>
		</div>
	);
};
