import { Button } from '../Button/Button'
import styles from './Calendar.module.scss'
import { Month } from '../Month/Month'
import { SelectDate } from '../SelectDate/SelectDate'
import { isEqual } from 'helpers/compare'
import { createDate } from 'helpers/createDate'
import { createMonth } from 'helpers/createMonth'
import { createSelectList } from 'helpers/createSelectList'
import { createYear } from 'helpers/createYear'
import { getMonthsNames } from 'helpers/getMonthsNames'
import { getWeekDaysNames } from 'helpers/getWeekDaysNames'
import { ICalendar, IDay } from 'types/types'
import { FC, useMemo, useState } from 'react'

interface ICalendarProps extends ICalendar {
	months?: 1 | 2
}

export const Calendar: FC<ICalendarProps> = ({
	locale = 'default',
	months = 1,
	minDate,
	maxDate,
	showCurrentDay,
	disabled,
	showSelectDate,
	showMonthName,
	date,
	onChange,
	focusDate,
	onFocusRange,
	hoverRangeCear,
	firstWeekDayIndex
}) => {
	const [today, setToday] = useState<IDay>(createDate({ locale }))

	const [panelDate, setPanelDate] = useState<IDay>(date ? date : createDate({ locale }))

	const [year, selectList] = useMemo(() => {
		const year = createYear({
			locale,
			year: panelDate.year,
			maxDate,
			minDate,
			firstWeekDayIndex
		})

		return [
			year.createMonthsYear(),
			createSelectList(
				minDate ? minDate.date : new Date(today.year - 100, 0),
				maxDate ? maxDate.date : new Date(today.year + 20, 11),
				locale
			)
		]
	}, [panelDate.year])

	const [weekDayNames, monthNames] = useMemo(() => {
		return [getWeekDaysNames({ firstWeekDayIndex, locale }), getMonthsNames(locale)]
	}, [locale])

	const nextMonth = () => {
		setPanelDate(prev =>
			createDate({
				date: new Date(prev.year, prev.monthIndex + 1)
			})
		)
	}

	const prevMonth = () => {
		setPanelDate(prev =>
			createDate({
				date: new Date(prev.year, prev.monthIndex - 1)
			})
		)
	}

	const getMonth = (i: number) => {
		return panelDate.monthIndex + i > 11
			? {
					daysInMonth: createMonth({
						date: new Date(panelDate.year + 1, 0),
						locale
					}).createDaysInMonth(minDate, maxDate),
					monthIndex: 0,
					year: panelDate.year + 1
			  }
			: year[panelDate.monthIndex + i]
	}

	return (
		<div className={styles.calendar}>
			<div className={styles.nav}>
				<Button
					onClick={prevMonth}
					variant='arrowLeft'
					disabled={isEqual(minDate?.yyyyMMKey, panelDate.yyyyMMKey) || disabled}
				/>
				{showSelectDate && (
					<SelectDate panelDate={panelDate} setPanelDate={setPanelDate} list={selectList} locale={locale} />
				)}
				<Button
					onClick={nextMonth}
					variant='arrowRight'
					disabled={isEqual(maxDate?.yyyyMMKey, panelDate.yyyyMMKey) || disabled}
				/>
			</div>
			<div className={styles.months}>
				{Array.from({ length: months }, (_, i) => {
					const month = getMonth(i)
					return (
						<Month
							key={i}
							month={month}
							today={today}
							showCurrentDay={showCurrentDay}
							disabled={disabled}
							showMonthName={showMonthName}
							date={date}
							onChange={onChange}
							focusDate={focusDate}
							onFocusRange={onFocusRange}
							monthNames={monthNames}
							weekDayNames={weekDayNames}
							hoverRangeCear={hoverRangeCear}
							firstWeekDayIndex={firstWeekDayIndex}
						/>
					)
				})}
			</div>
		</div>
	)
}
