import { WeekDayIndex } from 'types/types'

const indices = [0, 1, 2, 3, 4, 5, 6]

export const getNewWeekDayIndex = (
	weekDayIndex: number,
	firstWeekDayIndex: WeekDayIndex = 0
) => {
	return [
		...indices.slice(firstWeekDayIndex),
		...indices.slice(0, firstWeekDayIndex)
	].indexOf(weekDayIndex)
}
