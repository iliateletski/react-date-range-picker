import { createDate } from './createDate'

export const getMonthsNames = (locale: string = 'default') => {
	const monthsNames: {
		monthNameLong: ReturnType<typeof createDate>['monthNameLong']
		monthNameShort: ReturnType<typeof createDate>['monthNameShort']
	}[] = Array.from({
		length: 12
	})
	const date = new Date()

	monthsNames.forEach((_, i) => {
		const { monthIndex, monthNameLong, monthNameShort } = createDate({
			date: new Date(date.getFullYear(), i),
			locale
		})

		monthsNames[monthIndex] = { monthNameLong, monthNameShort }
	})

	return monthsNames
}
