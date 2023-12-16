import { Button } from '../Button/Button'
import { Calendar } from '../Calendar/Calendar'
import { DateField } from '../DateField/DateField'
import styles from './DateRangePicker.module.scss'
import { isAfter, isBefore } from 'helpers/compare'
import { useMatchMedia } from 'hooks/useMatchMedia'
import { FocusDate, ICalendar, IDay, Range, TypeField } from 'types/types'
import React, { FC, useEffect, useRef, useState } from 'react'

type ActiveField = { start: boolean; end: boolean }

interface DateRangePickerProps
	extends Omit<ICalendar, 'date' | 'onChange' | 'focusDate' | 'hoverRangeCear' | 'onFocusRange'> {
	months?: 1 | 2
	onRange: (date: Range) => void
	range: Range
	placeholders?: { startField: string; endField: string }
	showClearButton?: boolean
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
	range,
	disabled,
	locale,
	maxDate,
	minDate,
	months,
	showCurrentDay,
	showMonthName,
	showSelectDate,
	onRange,
	placeholders,
	firstWeekDayIndex,
	showClearButton
}) => {
	const { isMobile } = useMatchMedia()

	const [activeField, setActiveField] = useState<ActiveField>({
		start: false,
		end: false
	})

	const [focusDate, setFocusDate] = useState<FocusDate>({
		focus: null,
		hover: null
	})

	const dateRangeDivElement = useRef<HTMLDivElement>(null)

	const [startKey, endKey] = [range.startDate?.yyyyMmDdKey, range.endDate?.yyyyMmDdKey]

	const onCangeRange = (date: IDay) => {
		const dateKey = date.yyyyMmDdKey

		const isStartDate =
			(activeField.start && (!endKey || isBefore(dateKey, endKey) || dateKey === endKey)) ||
			(activeField.end && isBefore(dateKey, startKey))

		const newRange: Range = {
			startDate: isStartDate ? date : range.startDate,
			endDate: isStartDate ? range.endDate : date
		}

		const newFocusDate: FocusDate = {
			focus: isStartDate ? { ...focusDate.focus, start: dateKey } : { ...focusDate.focus, end: dateKey },
			hover: null
		}

		const newActiveField: ActiveField = {
			start: isStartDate || startKey ? false : true,
			end: !isStartDate || endKey ? false : true
		}

		onRange(newRange)
		setFocusDate(newFocusDate)
		setActiveField(newActiveField)
	}

	const onFocusRange = (dateKey: string) => {
		if (activeField.start) {
			if ((endKey && isBefore(dateKey, endKey)) || dateKey === endKey) {
				setFocusDate({ ...focusDate, hover: { start: dateKey, end: endKey } })
			} else if (isAfter(dateKey, startKey) || isAfter(dateKey, endKey)) {
				setActiveField({ start: false, end: true })
				setFocusDate({
					...focusDate,
					hover: startKey ? { start: startKey, end: dateKey } : null
				})
			}
		}

		if (activeField.end) {
			if ((startKey && isAfter(dateKey, startKey)) || dateKey === startKey) {
				setFocusDate({ ...focusDate, hover: { start: startKey, end: dateKey } })
			} else if (isBefore(dateKey, startKey) || isBefore(dateKey, endKey)) {
				setActiveField({ start: true, end: false })
				setFocusDate({
					...focusDate,
					hover: endKey ? { start: dateKey, end: endKey } : null
				})
			}
		}
	}

	const clear = (type: TypeField) => {
		setFocusDate({
			focus: type === 'start' ? null : { start: focusDate.focus?.start },
			hover: null
		})
		onRange({
			startDate: type === 'start' ? null : range.startDate,
			endDate: null
		})

		if (type === 'start' && activeField.end) {
			setActiveField({ start: true, end: false })
		}
	}

	const clickClose = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setActiveField({ start: false, end: false })
		}
	}

	const keyDownClose = (e: React.KeyboardEvent) => {
		if (e.code === 'Escape') {
			setActiveField({ start: false, end: false })
		}
	}

	useEffect(() => {
		const element = dateRangeDivElement.current
		if (!element) return
		const documentClick = (e: MouseEvent) => {
			if (!(e.target instanceof Node)) return
			if (!element.contains(e.target)) {
				setActiveField({ start: false, end: false })
			}
		}

		document.addEventListener('click', documentClick)

		return () => document.removeEventListener('click', documentClick)
	}, [])

	return (
		<div className={styles.dateRange} ref={dateRangeDivElement} onKeyDown={keyDownClose}>
			<div className={styles.fields}>
				<DateField
					active={activeField.start}
					value={`${range?.startDate?.yyyyMmDdKey || ''}`}
					disabled={disabled}
					open={() => setActiveField({ start: true, end: false })}
					clear={clear}
					type='start'
					placeholder={placeholders?.startField}
					showClearButton={showClearButton}
				/>
				<DateField
					value={`${range?.endDate?.yyyyMmDdKey ?? ''}`}
					open={() => setActiveField({ start: false, end: true })}
					clear={clear}
					active={activeField.end}
					disabled={disabled}
					type='end'
					placeholder={placeholders?.endField}
					showClearButton={showClearButton}
				/>
			</div>
			{(activeField.start || activeField.end) && (
				<div className={isMobile ? styles.mobileBox : styles.desktopBox} onClick={clickClose}>
					<div className={styles.calendarWrapper}>
						{isMobile && (
							<Button
								onClick={() => setActiveField({ start: false, end: false })}
								variant='close'
								disabled={disabled}
							/>
						)}
						<Calendar
							disabled={disabled}
							locale={locale}
							maxDate={maxDate}
							minDate={minDate}
							months={months}
							onChange={date => onCangeRange(date)}
							showCurrentDay={showCurrentDay}
							showMonthName={showMonthName}
							showSelectDate={showSelectDate}
							date={range?.startDate}
							focusDate={focusDate}
							onFocusRange={onFocusRange}
							hoverRangeCear={() => setFocusDate({ ...focusDate, hover: null })}
							firstWeekDayIndex={firstWeekDayIndex}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
