import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { logout } from '@/services/user/user-action';
import { useDispatch } from '@/services/store';

export const Profile = (): React.JSX.Element => {
	const dispatch = useDispatch();

	const logoutClick = () => {
		dispatch(logout());
	};

	return (
		<div className={styles.container}>
			<nav className={`${styles.navigation} mr-15`}>
				<NavLink
					end
					to='/profile'
					className={({ isActive }) =>
						`text text_type_main-medium ${styles.navigation__link} ${isActive ? styles.navigation__link_active : ''}`
					}>
					Профиль
				</NavLink>
				<NavLink
					end
					to='/profile/orders'
					className={({ isActive }) =>
						`text text_type_main-medium ${styles.navigation__link} ${isActive ? styles.navigation__link_active : ''}`
					}>
					История заказов
				</NavLink>
				<button
					className={`text text_type_main-medium ${styles.logout_button}`}
					onClick={logoutClick}>
					Выход
				</button>

				<div
					className={'text text_type_main-default text_color_inactive mt-20'}>
					В этом разделе вы можете изменить свои персональные данные
				</div>
			</nav>
			<Outlet />
		</div>
	);
};
