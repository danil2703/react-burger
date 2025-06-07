import { TIngredient } from '@utils/types.ts';
import React from 'react';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';

type TBurgerConstructorElementProps = {
	ingredient: TIngredient;
	isLocked?: boolean;
	type?: 'top' | 'bottom';
	extraClass?: string;
};

export const BurgerConstructorElement = ({
	ingredient,
	isLocked = false,
	type,
	extraClass,
}: TBurgerConstructorElementProps): React.JSX.Element => {
	return (
		<li className={`${styles.constructor_element} ${extraClass}`}>
			{!isLocked && <DragIcon className={styles.lock_icon} type='primary' />}
			<ConstructorElement
				extraClass='ml-8'
				key={ingredient._id}
				text={ingredient.name}
				thumbnail={ingredient.image}
				price={ingredient.price}
				isLocked={isLocked}
				type={type}
			/>
		</li>
	);
};
