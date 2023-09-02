import PageHeader from '../ui/PageHeader'
import styles from '../../styles/BaristaStatView.module.scss'
import EditButton from '../ui/EditButton'

const BaristaStatView = ({ barista, error, loading }) => {
	const items =
		barista.length !== 0
			? barista.map((item, i) => {
					return (
						<EditButton
							key={i}
							actionName={`${item.name} ${item.last_name}`}
							currentValue={item.phone}
						/>
					)
			    })
			: null
	return (
		<div className={styles.baristaStat}>
			<PageHeader text='Статистика сотрудника' />
			{items}
		</div>
	)
}

export default BaristaStatView
