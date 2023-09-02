import MainButtonLink from '../ui/MainButtonLink'
import PageHeader from '../ui/PageHeader'
import styles from '../../styles/Seending.module.scss'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const SendingHistoryView = ({ notifications, error, loading }) => {
	const items = notifications.map((singleNotif, i) => {
		const date = singleNotif.created_at.slice(0, 10).replace(/-/g, '.')
		const time = singleNotif.created_at.slice(11, 16)

		const telegram = singleNotif.telegram == 1 ? <li>Телеграм</li> : null
		const site = singleNotif.site == 1 ? <li>Сайт</li> : null
		const email = singleNotif.email == 1 ? <li>Почта</li> : null

		return (
			<div className={styles.singleNotification} key={i}>
				<div className={styles.singleNotification_topBlock}>
					<div className={styles.singleNotification_topBlock_item}>
						<p className={styles.singleNotification_p}>
							Дата создания:
						</p>
						<p>{date}</p>
						<p>{time}</p>
					</div>
					<div className={styles.singleNotification_topBlock_item}>
						<p className={styles.singleNotification_p}>
							Вид рассылки:
						</p>
						<ul className={styles.singleNotification_list}>
							{telegram}
							{site}
							{email}
						</ul>
					</div>
				</div>
				<div>
					<p className={styles.singleNotification_p}>Содержание:</p>
					<p>{singleNotif.text}</p>
				</div>
			</div>
		)
	})

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <LoadingMessage /> : null
	const content = !(loading || error) ? items : null

	return (
		<div className={styles.seending}>
			<PageHeader text='История рассылки' />
			{errorMessage}
			{spinner}
			{content}
			<MainButtonLink
				buttonName='Вернуться назад'
				action='primary'
				href='/sending'
			/>
		</div>
	)
}

export default SendingHistoryView
