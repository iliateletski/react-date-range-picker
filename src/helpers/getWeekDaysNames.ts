import { createDate } from './createDate'
import { WeekDayIndex } from 'types/types'

interface GetWeekDaysNamesParams {
	firstWeekDayIndex?: WeekDayIndex
	locale?: string
}

export const getWeekDaysNames = ({
	firstWeekDayIndex = 0,
	locale = 'default'
}: GetWeekDaysNamesParams) => {
	const daysNames: {
		weekDayNameLong: string
		weekDayNameShort: string
	}[] = Array.from({ length: 7 })

	const date = new Date()

	daysNames.forEach((_, i) => {
		const { weekDayIndex, weekDayNameLong, weekDayNameShort } = createDate({
			date: new Date(date.getFullYear(), date.getMonth(), i),
			locale
		})

		daysNames[weekDayIndex] = { weekDayNameLong, weekDayNameShort }
	})
	return [
		...daysNames.slice(firstWeekDayIndex),
		...daysNames.slice(0, firstWeekDayIndex)
	]
}
