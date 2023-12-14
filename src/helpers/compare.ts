type CompareFunction = (
	dateKey: string | undefined | null,
	dateKeyToCompare: string | undefined | null
) => boolean

export const isBefore: CompareFunction = (dateKey, dateKeyToCompare) => {
	if (!dateKey || !dateKeyToCompare) return false
	return dateKey < dateKeyToCompare
}

export const isAfter: CompareFunction = (dateKey, dateKeyToCompare) => {
	if (!dateKey || !dateKeyToCompare) return false
	return dateKey > dateKeyToCompare
}

export const isEqual: CompareFunction = (dateKey, dateKeyToCompare) => {
	if (!dateKey || !dateKeyToCompare) return false
	return dateKey === dateKeyToCompare
}
