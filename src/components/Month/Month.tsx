import { ICalendar, IDay, IMonth, MonthNames, WeekDayNames } from '../../types/types'
import styles from './Month.module.scss'
import { Day } from '../Day/Day'
import { FC } from 'react'

interface IMonthProps extends Omit<ICalendar, 'locale' | 'maxDate' | 'minDate' | 'showSelectDate'> {
	today: IDay
	month: IMonth
	weekDayNames: WeekDayNames[]
	monthNames: MonthNames[]
}

export const Month: FC<IMonthProps> = ({
	date,
	onChange,
	month,
	today,
	showCurrentDay,
	disabled,
	showMonthName,
	focusDate,
	onFocusRange,
	monthNames,
	weekDayNames,
	hoverRangeCear,
	firstWeekDayIndex
}) => {
	const selectDate = (date: IDay) => {
		!date.disabled && onChange?.(date)
	}

	return (
		<div className={styles.month}>
			{showMonthName && (
				<div className={styles.monthName} style={{ textAlign: showMonthName.textAlign }}>
					{`${
						showMonthName.length === 'long'
							? monthNames[month.monthIndex].monthNameLong
							: monthNames[month.monthIndex].monthNameShort.replace('.', '')
					} ${month.year}`}
				</div>
			)}
			<div className={styles.weekDays}>
				{weekDayNames.map(dayName => (
					<div className={styles.weekDay} key={dayName.weekDayNameShort}>
						{dayName.weekDayNameShort}
					</div>
				))}
			</div>
			<div className={styles.monthDays} onMouseLeave={() => hoverRangeCear?.()}>
				{month.daysInMonth.map((day, i) =>
					day ? (
						<Day
							key={day.yyyyMmDdKey}
							day={day}
							disabled={disabled}
							focusDate={focusDate}
							today={today}
							date={date}
							onClick={selectDate}
							onFocusRange={onFocusRange}
							showCurrentDay={showCurrentDay}
							firstWeekDayIndex={firstWeekDayIndex}
						/>
					) : (
						<div className={styles.monthDay} key={`${today.yyyyMmDdKey}-${i}`}></div>
					)
				)}
			</div>
		</div>
	)
}
