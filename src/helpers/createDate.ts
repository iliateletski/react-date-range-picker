import { IDay } from 'types/types'

interface CreateDateParams {
	date?: Date
	locale?: string
}

export const createDate = (params?: CreateDateParams): IDay => {
	const d = params?.date || new Date()
	const locale = params?.locale || 'default'

	return {
		date: d,
		year: d.getFullYear(),
		dayNumber: d.getDate(),
		monthIndex: d.getMonth(),
		monthNumber: d.getMonth() + 1,
		monthNameLong: d.toLocaleDateString(locale, { month: 'long' }),
		monthNameShort: d.toLocaleDateString(locale, { month: 'short' }),
		yyyyMmDdKey: new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10),
		yyyyMMKey: new Date(Date.UTC(d.getFullYear(), d.getMonth())).toISOString().slice(0, 7),
		weekDayIndex: d.getDay(),
		weekDayNumber: d.getDay() + 1,
		weekDayNameLong: d.toLocaleDateString(locale, { weekday: 'long' }),
		weekDayNameShort: d.toLocaleDateString(locale, { weekday: 'short' }),
		yearShort: d.toLocaleDateString(locale, { year: '2-digit' }),
		selected: false
	}
}
