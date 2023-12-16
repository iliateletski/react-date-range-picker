import { isAfter, isBefore } from './compare'
import { FocusDate } from 'types/types'

export const getPlaceholders = (dayKey: string, focusDate: FocusDate | undefined) => {
	let startKey = focusDate?.hover?.start ?? focusDate?.focus?.start
	let endKey = focusDate?.hover?.end ?? focusDate?.focus?.end

	if (isBefore(endKey, startKey)) [startKey, endKey] = [endKey, startKey]

	return {
		inRange: isAfter(dayKey, startKey) && isBefore(dayKey, endKey),
		isSelected: [startKey, endKey].includes(dayKey)
	}
}
