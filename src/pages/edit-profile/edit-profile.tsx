import { AppDispatch } from '@/services/store';
import { getUser } from '@/services/user/user';
import { updateUser } from '@/services/user/user-action';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './edit.profile.module.css';

export const EditProfile = (): React.JSX.Element => {
	const user = useSelector(getUser);
	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch<AppDispatch>();

	const formSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(updateUser({ name, email, password }));
	};

	const resetForm = () => {
		setName(user?.name || '');
		setEmail(user?.email || '');
		setPassword('');
	};

	return (
		<form onSubmit={formSubmit}>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setName(e.target.value)}
				value={name}
				extraClass='mb-6'
				icon={'EditIcon'}
			/>
			<EmailInput
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				placeholder='E-mail'
				extraClass='mb-6'
				disabled={false}
				isIcon={true}
			/>
			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				disabled={false}
				extraClass='mb-6'
				icon={'EditIcon'}
			/>

			<div className={styles.actions}>
				<Button
					onClick={resetForm}
					htmlType='button'
					type='secondary'
					size='medium'>
					Отмена
				</Button>
				<Button htmlType='submit' type='primary' size='large'>
					Сохранить
				</Button>
			</div>
		</form>
	);
};
