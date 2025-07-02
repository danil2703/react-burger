import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor-drag-container.module.css';

type BurgerConstructorElementProps = {
	type?: 'top' | 'bottom';
	canDrop: boolean;
};

export const BurgerConstructorDragContainer = ({
	type,
	canDrop,
}: BurgerConstructorElementProps): React.JSX.Element => {
	return (
		<ConstructorElement
			extraClass={`ml-8 ${canDrop && styles.can_drop}`}
			text={'пусто'}
			thumbnail={'/public/ripples.svg'}
			price={0}
			isLocked={true}
			type={type}
		/>
	);
};
