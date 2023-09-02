import PageHeader from '../ui/PageHeader'
import styles from '../../styles/BonusesView.module.scss'
import Input from '../ui/Input'
import ErrorMessage from '../ui/ErrorMessage'
import LoadingMessage from '../ui/LoadingMessage'
import BonusesTable from '../ui/BonusesTable'
import BonusesAddDialog from '../ui/BonusesAddDialog'
import BonusesRemoveDialog from '../ui/BonusesRemoveDialog'

const BonusesView = ({
	error,
	loading,
	allUsers,
	writeOff,
	searchTerm,
	setSearchTerm,
	handleCloseDialogAdd,
	openDialogAdd,
	bonusCount,
	addBonuses,
	id,
	sendBonuses,
	handleCloseDialogRemove,
	openDialogRemove,
	removeBonuses,
	filteredUsers,
	setBonusCount,
	handleOpenDialogAdd,
	handleOpenDialogRemove,
	messages,
}) => {
	const errorMessage = error ? <ErrorMessage /> : null
	const spinner = loading ? <LoadingMessage /> : null
	const content = !(loading || error) ? (
		<BonusesTable
			filteredUsers={filteredUsers}
			bonusCount={bonusCount}
			addBonuses={addBonuses}
			removeBonuses={removeBonuses}
			setBonusCount={setBonusCount}
			id={id}
			handleOpenDialogAdd={handleOpenDialogAdd}
			handleOpenDialogRemove={handleOpenDialogRemove}
		/>
	) : null

	return (
		<div className={styles.bonuses}>
			<PageHeader text='Бонусы' />
			<Input
				name='phone'
				type='tel'
				placeholder='Начните вводить номер'
				onChange={e => setSearchTerm(e.target.value)}
				pattern='\+?[0-9\s\-\(\)]+'
				value={searchTerm}
			/>
			{errorMessage}
			{spinner}
			{searchTerm != '' ? content : null}
			<ErrorMessage textError={messages} />
			<BonusesAddDialog
				handleCloseDialog={handleCloseDialogAdd}
				openDialog={openDialogAdd}
				bonusCount={bonusCount}
				addBonuses={addBonuses}
				removeBonuses={removeBonuses}
				id={id}
				sendBonuses={sendBonuses}
			/>
			<BonusesRemoveDialog
				handleCloseDialog={handleCloseDialogRemove}
				openDialog={openDialogRemove}
				bonusCount={bonusCount}
				removeBonuses={removeBonuses}
				addBonuses={addBonuses}
				id={id}
				sendBonuses={sendBonuses}
				writeOff={writeOff}
			/>
		</div>
	)
}

export default BonusesView
