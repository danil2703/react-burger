import React, { FormEvent, useState } from 'react';
import styles from '../login/login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

export const ResetPassword = (): React.JSX.Element => {
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const navigate = useNavigate();

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		api.passwordConfirmReset({ password, code }).then(() => {
			localStorage.removeItem('isResetEmailSend');
			navigate('/login');
		});
	};

	if (!localStorage.getItem('isResetEmailSend')) {
		return <Navigate to='/forgot-password' />;
	}

	return (
		<main className={styles.container}>
			<form onSubmit={formSubmit} className={styles.form}>
				<h3 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h3>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					placeholder='Введите новый пароль'
					extraClass='mb-6'
				/>

				<Input
					type={'text'}
					onChange={(e) => setCode(e.target.value)}
					value={code}
					placeholder='Введите код из письма'
					extraClass='mb-6'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Сохранить
				</Button>

				<div className={`${styles.link_container} text text_type_main-default`}>
					<div className='mb-4'>
						Вспомнили пароль?
						<Link className={styles.link} to='/login'>
							Войти
						</Link>
					</div>
				</div>
			</form>
		</main>
	);
};
