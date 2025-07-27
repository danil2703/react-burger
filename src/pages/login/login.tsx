import React, { FormEvent, useState } from 'react';
import styles from './login.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { login } from '@/services/user/user-action';

export const Login = (): React.JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch<AppDispatch>();

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	return (
		<main className={styles.container}>
			<form onSubmit={formSubmit} className={styles.form}>
				<h3 className='text text_type_main-medium mb-6'>Вход</h3>
				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder='E-mail'
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					extraClass='mb-6'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Войти
				</Button>

				<div className={`${styles.link_container} text text_type_main-default`}>
					<div className='mb-4'>
						Вы — новый пользователь?
						<Link className={styles.link} to='/register'>
							Зарегистрироваться
						</Link>
					</div>

					<div>
						Забыли пароль?
						<Link className={styles.link} to='/forgot-password'>
							Восстановить пароль
						</Link>
					</div>
				</div>
			</form>
		</main>
	);
};
