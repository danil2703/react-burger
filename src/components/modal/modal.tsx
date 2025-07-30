import React, { useEffect } from 'react';
import styles from './modal.module.css';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
	children: React.ReactNode;
	onClose: () => void;
	title?: string;
};

export const Modal = ({
	title,
	children,
	onClose,
}: ModalProps): React.JSX.Element | null => {
	const onKeydown = ({ key }: KeyboardEvent) => {
		if (key === 'Escape') {
			onClose();
		}
		return;
	};

	useEffect(() => {
		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener('keydown', onKeydown);
	});

	if (!modalRoot) {
		return null;
	}

	return createPortal(
		<>
			<ModalOverlay onClose={onClose}></ModalOverlay>
			<div className={`${styles.modal} p-10`}>
				<div className={styles.modal_header}>
					<h3 className={`${styles.modal_title} text text_type_main-large`}>
						{title}
					</h3>

					<button onClick={onClose} className={styles.modal_close_button}>
						<CloseIcon type='primary' />
					</button>
				</div>

				<div className={styles.modal_content}>{children}</div>
			</div>
		</>,
		modalRoot
	);
};
