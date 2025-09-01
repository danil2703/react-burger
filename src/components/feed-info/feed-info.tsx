import React from 'react';
import styles from './feed-info.module.css';

type FeedInfoProps = {
	total: number;
	totalToday: number;
	lastReadyOrderNums: number[];
	lastPendingOrderNums: number[];
};

export const FeedInfo = ({
	total,
	totalToday,
	lastReadyOrderNums,
	lastPendingOrderNums,
}: FeedInfoProps): React.JSX.Element | null => {
	return (
		<div>
			<section className={styles.orders_table}>
				<div>
					<div className='mb-6 text text_type_main-medium'>Готовы:</div>
					<ul className={styles.order_list}>
						{lastReadyOrderNums.map((num, i) => (
							<li
								key={i}
								className='status-complete text text_type_digits-default mb-2'>
								{num}
							</li>
						))}
					</ul>
				</div>

				<div>
					<div className='mb-6 text text_type_main-medium'>В работе:</div>
					<ul className={styles.order_list}>
						{lastPendingOrderNums.map((num, i) => (
							<li
								key={i}
								className='status-complete text text_type_digits-default mb-2'>
								{num}
							</li>
						))}
					</ul>
				</div>
			</section>

			{total > 0 && (
				<section className='mt-15'>
					<div className='text text_type_main-medium'>
						Выполнено за все время:
					</div>
					<div className='text text_type_digits-large digint-shadow'>
						{total}
					</div>
				</section>
			)}

			{totalToday > 0 && (
				<section className='mt-15'>
					<div className='text text_type_main-medium'>
						Выполнено за сегодня:
					</div>
					<div className='text text_type_digits-large digint-shadow'>
						{totalToday}
					</div>
				</section>
			)}
		</div>
	);
};
