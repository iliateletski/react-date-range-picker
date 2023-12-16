import { isAfter, isBefore } from './compare'
import { createDate } from './createDate'
import { numberOfDaysMonth } from './numberOfDaysMonth'
import { IDay } from 'types/types'

interface CreateMonthParams {
	date?: Date
	locale?: string
}

export const createMonth = (params?: CreateMonthParams) => {
	const locale = params?.locale || 'default'
	const d = params?.date || new Date()

	const date = createDate({ date: d, locale })
	const { monthIndex, monthNumber, monthNameLong, monthNameShort, year } = date

	const getDay = (dayNumber: number) => createDate({ date: new Date(year, monthIndex, dayNumber), locale })

	const createDaysInMonth = (minDate: IDay | undefined, maxDate: IDay | undefined) => {
		const month = []

		for (let i = 0; i < numberOfDaysMonth(monthIndex, year); i++) {
			const date = getDay(i + 1)
			month[i] = {
				...date,
				disabled:
					isBefore(date.yyyyMmDdKey, minDate?.yyyyMmDdKey) || isAfter(date.yyyyMmDdKey, maxDate?.yyyyMmDdKey)
			}
		}
		return month
	}

	return {
		monthIndex,
		monthNumber,
		monthNameLong,
		monthNameShort,
		year,
		getDay,
		createDaysInMonth
	}
}
