import { getNewWeekDayIndex } from './getNewWeekIndex'
import { IDay, IMonth, WeekDayIndex } from 'types/types'
import { get } from 'http'

export const addEmptyDaysInMonth = (
	month: IMonth,
	firstWeekDayIndex: WeekDayIndex = 0
) => {
	const { daysInMonth } = month
	const firstDayMonthIndex = daysInMonth[0]!.weekDayIndex
	const lastDayMonthIndex = daysInMonth[daysInMonth.length - 1]!.weekDayIndex

	return {
		...month,
		daysInMonth: [
			...Array.from(
				{
					length: getNewWeekDayIndex(firstDayMonthIndex, firstWeekDayIndex)
				},
				() => null
			),
			...daysInMonth,
			...Array.from(
				{
					length: getNewWeekDayIndex(lastDayMonthIndex, firstWeekDayIndex)
				},
				() => null
			)
		]
	}
}
