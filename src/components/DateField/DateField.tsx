import { Button } from '../Button/Button'
import styles from './DateField.module.scss'
import { TypeField } from 'types/types'
import { FC, KeyboardEvent, MouseEvent } from 'react'

interface DateFieldProps {
	value: string
	active: boolean
	type: TypeField
	open: () => void
	clear: (type: TypeField) => void
	placeholder?: string
	disabled?: boolean
	showClearButton?: boolean
}

export const DateField: FC<DateFieldProps> = ({
	value,
	active,
	placeholder,
	open,
	clear,
	disabled,
	type,
	showClearButton
}) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Enter') open()
	}

	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()
		clear(type)
	}

	return (
		<div className={styles.dateField}>
			<div onClick={open}>
				<input
					className={[styles.field, active ? styles.active : ''].join(' ')}
					readOnly
					disabled={disabled}
					onKeyDown={handleKeyDown}
					value={value}
					placeholder={placeholder}
				/>
			</div>
			{value && showClearButton && <Button variant='clear' disabled={disabled} onClick={handleClear} />}
		</div>
	)
}
