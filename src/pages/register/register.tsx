import React, { FormEvent, useState } from 'react';
import styles from '../login/login.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '@/services/user/user-action';
import { AppDispatch } from '@/services/store';

export const Register = (): React.JSX.Element => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch<AppDispatch>();

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		const formData = { name, email, password };
		dispatch(register(formData));
	};

	return (
		<main className={styles.container}>
			<form onSubmit={formSubmit} className={styles.form}>
				<h3 className='text text_type_main-medium mb-6'>Регистрация</h3>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setName(e.target.value)}
					value={name}
					extraClass='mb-6'
				/>
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
					Зарегистрироваться
				</Button>

				<div className={`${styles.link_container} text text_type_main-default`}>
					<div className='mb-4'>
						Уже зарегистрированы?
						<Link className={styles.link} to='/login'>
							Войти
						</Link>
					</div>
				</div>
			</form>
		</main>
	);
};
