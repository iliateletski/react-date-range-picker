import styles from './Day.module.scss'
import { getNewWeekDayIndex } from 'helpers/getNewWeekIndex'
import { getPlaceholders } from 'helpers/getPlaceholders'
import { numberOfDaysMonth } from 'helpers/numberOfDaysMonth'
import { FocusDate, IDay, WeekDayIndex } from 'types/types'
import { FC, FocusEvent, MouseEvent } from 'react'

interface IDayProps {
	day: IDay
	disabled?: boolean
	showCurrentDay?: boolean
	today: IDay
	focusDate?: FocusDate
	onClick: (date: IDay) => void
	onFocusRange?: (dateKey: string) => void
	date?: IDay | null
	firstWeekDayIndex?: WeekDayIndex
}

export const Day: FC<IDayProps> = ({
	day,
	disabled,
	showCurrentDay,
	today,
	focusDate,
	onClick,
	onFocusRange,
	date,
	firstWeekDayIndex
}) => {
	const isStartOfWeek = firstWeekDayIndex === day.weekDayIndex
	const isEndOfWeek = getNewWeekDayIndex(day.weekDayIndex, firstWeekDayIndex) === 6
	const isFirstDayOfMonth = day.dayNumber === 1
	const isLastDayOfMonth = numberOfDaysMonth(day.monthIndex, day.year) === day.dayNumber

	const showToday = showCurrentDay && day.yyyyMmDdKey === today.yyyyMmDdKey
	const isDisabled = day.disabled || disabled
	const { inRange, isSelected } = focusDate
		? getPlaceholders(day.yyyyMmDdKey, focusDate)
		: { inRange: false, isSelected: date?.yyyyMmDdKey === day.yyyyMmDdKey }

	const handleMouseEvent = (e: MouseEvent | FocusEvent) => {
		if (isDisabled) return
		switch (e.type) {
			case 'click':
				onClick(day)
				break
			case 'mouseenter':
				onFocusRange?.(day.yyyyMmDdKey)
				break
			case 'focus':
				onFocusRange?.(day.yyyyMmDdKey)
				break
		}
	}

	return (
		<button
			className={[styles.monthDay, showToday ? styles.today : '', isSelected ? styles.selected : ''].join(
				' '
			)}
			disabled={isDisabled}
			onClick={e => handleMouseEvent(e)}
			onMouseEnter={e => handleMouseEvent(e)}
			onFocus={e => handleMouseEvent(e)}
		>
			{inRange && (
				<div
					className={[
						styles.hoverRange,
						isStartOfWeek || isFirstDayOfMonth ? styles.leftEdge : '',
						isEndOfWeek || isLastDayOfMonth ? styles.rightEdge : ''
					].join(' ')}
				></div>
			)}

			{day.dayNumber}
		</button>
	)
}
