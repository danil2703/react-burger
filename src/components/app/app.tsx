import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from '@/pages/home/home';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useGetIngredientsQuery } from '@/services/ingredients-api/ingredients-api';
import { Login } from '@/pages/login/login';
import { Register } from '@/pages/register/register';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { checkUserAuth } from '@/services/user/user-action';
import { useDispatch } from '@/services/store';
import {
	OnlyUnAuth,
	OnlyAuth,
} from '@components/protected-route/protected-route';

import { Profile } from '@/pages/profile/profile';
import { EditProfile } from '@/pages/edit-profile/edit-profile';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { Feed } from '@/pages/feed/feed';
import { ProfileOrders } from '@/pages/profile-orders/profile-orders';
import { OrderFullInfo } from '../order-full-info/order-full-info';

export const App = (): React.JSX.Element => {
	const location = useLocation();
	const navigate = useNavigate();
	useGetIngredientsQuery();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [dispatch]);

	return (
		<div className={styles.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Home />} />
				<Route path='/test' element={<OrderFullInfo />} />
				<Route
					path='/ingredients/:ingredientId'
					element={<IngredientDetails />}
				/>
				<Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
					<Route path='/profile' element={<EditProfile />} />
					<Route path=':orders' element={<ProfileOrders />} />
				</Route>
				<Route path='/feed' element={<Feed />} />
				<Route path='/feed/:number' element={<OrderFullInfo />} />
				<Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
				<Route
					path='/register'
					element={<OnlyUnAuth component={<Register />} />}
				/>
				<Route
					path='/forgot-password'
					element={<OnlyUnAuth component={<ForgotPassword />} />}
				/>
				<Route
					path='/reset-password'
					element={<OnlyUnAuth component={<ResetPassword />} />}
				/>
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/feed/:number'
						element={
							<Modal onClose={handleModalClose}>
								<OrderFullInfo />
							</Modal>
						}
					/>
				</Routes>
			)}

			{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};

export default App;
