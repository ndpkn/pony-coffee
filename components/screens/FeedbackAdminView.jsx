import PageHeader from '../ui/PageHeader'
import styles from '../../styles/FeedbackAdminView.module.scss'
import EditButton from '../../components/ui/EditButton'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'

const FeedbackAdminView = ({ feedbacks, error, loading }) => {
	const items = feedbacks.map((item, i) => {
		return (
			<EditButton
				key={i}
				actionName={item.user.name}
				currentValue={item.messages[0].text}
				grade={item.grade}
				link={`/feedback/admin/${item.id}`}
			/>
		)
	})

	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <LoadingMessage /> : null
	const content = !(loading || error) ? items : null

	return (
		<div className={styles.feedback}>
			<PageHeader text='Все обращения' />
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

export default FeedbackAdminView
