import { addEmptyDaysInMonth } from './addEmptyDaysInMonth'
import { createDate } from './createDate'
import { createMonth } from './createMonth'
import { IDay, WeekDayIndex } from 'types/types'

interface CreateYearParams {
	year?: number
	locale?: string
	minDate?: IDay
	maxDate?: IDay
	firstWeekDayIndex?: WeekDayIndex
}

export const createYear = (params?: CreateYearParams) => {
	const year = params?.year ?? null
	const locale = params?.locale ?? 'default'

	const today = createDate()

	const getMonth = (monthIndex: number) => {
		const month = createMonth({
			date: new Date(year ?? today.year, monthIndex),
			locale
		})
		return {
			daysInMonth: month.createDaysInMonth(params?.minDate, params?.maxDate),
			year: month.year,
			monthIndex: month.monthIndex
		}
	}

	const createMonthsYear = () => {
		const months = []

		for (let i = 0; i < 12; i++) {
			months[i] = addEmptyDaysInMonth(getMonth(i), params?.firstWeekDayIndex)
		}

		return months
	}
	return {
		year: year ?? today.year,
		getMonth,
		createMonthsYear
	}
}
