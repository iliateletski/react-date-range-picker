import { createDate } from './createDate'
import { getMonthsNames } from './getMonthsNames'
import { SelectList } from 'types/types'

export const createSelectList = (
	startDate: Date,
	endDate: Date,
	locale = 'default'
): SelectList => {
	let sDate = startDate
	let eDate = endDate

	if (endDate < startDate) [sDate, eDate] = [endDate, startDate]

	const [eMonth, eYear, sMonth, sYear] = [
		eDate.getMonth(),
		eDate.getFullYear(),
		sDate.getMonth(),
		sDate.getFullYear()
	]
	const numberOfYears = eYear - sYear + 1
	const numberOfMonths = (eYear - sYear) * 12 + (eMonth - sMonth) + 1
	const length = numberOfMonths + numberOfYears
	const monthNames = getMonthsNames(locale)

	const list = []

	for (let i = 0, m = sMonth, y = sYear; i < length; i++) {
		if (i === 0) {
			list[i] = y
		} else if (m > 11) {
			y++
			m = 0
			list[i] = y
		} else {
			list[i] = {
				name: monthNames[m].monthNameLong,
				value: new Date(Date.UTC(y, m)).toISOString().slice(0, 7)
			}
			m++
		}
	}
	return list
}
