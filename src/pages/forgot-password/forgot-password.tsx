import React, { FormEvent, useState } from 'react';
import styles from '../login/login.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

export const ForgotPassword = (): React.JSX.Element => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		api.passwordReset(email).then(() => {
			localStorage.setItem('isResetEmailSend', 'true');
			navigate('/reset-password');
		});
	};

	return (
		<main className={styles.container}>
			<form onSubmit={formSubmit} className={styles.form}>
				<h3 className='text text_type_main-medium mb-6'>
					Восстановление пароля
				</h3>
				<EmailInput
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder='Укажите e-mail'
					extraClass='mb-6'
				/>

				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Восстановить
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
