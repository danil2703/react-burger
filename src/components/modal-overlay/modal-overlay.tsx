import React from 'react';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById('modal-root');

type ModalOverlayProps = {
	onClose: () => void;
};

export const ModalOverlay = ({
	onClose,
}: ModalOverlayProps): React.JSX.Element | null => {
	if (!modalRoot) {
		return null;
	}

	return <div className={styles.modal_overlay} onClick={onClose}></div>;
};
