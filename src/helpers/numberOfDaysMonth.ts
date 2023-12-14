

interface NumberOfDaysMonthParams {
	monthIndex: number
	year?: number
}

const isLeapYear = (year: number) => {
	return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

export const numberOfDaysMonth = (
	monthIndex: number,
	year = new Date().getFullYear()
) => {
	const monthSizes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	const isFebruary = monthIndex === 1
	return isFebruary && isLeapYear(year)
		? monthSizes[monthIndex] + 1
		: monthSizes[monthIndex]
}
