import styles from './SelectDate.module.scss'
import { createDate } from 'helpers/createDate'
import { IDay, SelectList } from 'types/types'
import { FC } from 'react'

interface ISelectDateProps {
	setPanelDate: (callback: (state: IDay) => IDay) => void
	panelDate: IDay
	locale?: string
	list: SelectList
}

export const SelectDate: FC<ISelectDateProps> = ({ setPanelDate, panelDate, locale, list }) => {
	return (
		<label className={styles.selectDate}>
			{`${panelDate.monthNameLong} ${panelDate.year}`}
			<svg className={styles.selectIcon} focusable='false' aria-hidden='true' viewBox='0 0 24 24'>
				<path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'></path>
			</svg>
			<select
				className={styles.select}
				value={panelDate.yyyyMMKey}
				onChange={e => {
					setPanelDate(() =>
						createDate({
							date: new Date(e.target.value),
							locale
						})
					)
				}}
			>
				{list.map(item =>
					typeof item === 'number' ? (
						<option className={styles.option} disabled key={item}>
							{item}
						</option>
					) : (
						<option className={styles.option} value={item.value} key={item.value}>
							{item.name}
						</option>
					)
				)}
			</select>

			<span className={styles.customSelect}></span>
		</label>
	)
}
