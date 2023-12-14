export interface ICalendar {
	locale?: string
	minDate?: IDay
	maxDate?: IDay
	showCurrentDay?: boolean
	showSelectDate?: boolean
	disabled?: boolean
	showMonthName?: { length: 'short' | 'long'; textAlign: 'center' | 'left' }
	hoverRangeCear?: () => void
	onChange?: (date: IDay) => void
	date?: IDay | null
	focusDate?: FocusDate
	firstWeekDayIndex?: WeekDayIndex
	onFocusRange?: (dateKey: string) => void
}

export interface IDay {
	date: Date
	year: number
	dayNumber: number
	monthIndex: number
	monthNumber: number
	monthNameLong: string
	monthNameShort: string
	yyyyMMKey: string
	yyyyMmDdKey: string
	weekDayIndex: number
	weekDayNumber: number
	weekDayNameLong: string
	weekDayNameShort: string
	yearShort: string
	selected: boolean
	disabled?: boolean
}

export interface IMonth {
	daysInMonth: (IDay | null)[]
	monthIndex: number
	year: number
}

export type SelectList = (number | { name: string; value: string })[]

export type Range = { startDate: IDay | null; endDate: IDay | null }

export type WeekDayNames = {
	weekDayNameLong: string
	weekDayNameShort: string
}

export type MonthNames = {
	monthNameLong: string
	monthNameShort: string
}

export type FocusDate = {
	focus: { start?: string; end?: string } | null
	hover: { start?: string; end?: string } | null
}

export type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type TypeField = 'start' | 'end'
