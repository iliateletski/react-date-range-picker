import styles from './Button.module.scss'
import { FC, MouseEvent } from 'react'

interface IButtonProps {
	onClick: (e: MouseEvent) => void
	disabled?: boolean
	variant: 'arrowLeft' | 'arrowRight' | 'close' | 'clear'
}

export const Button: FC<IButtonProps> = ({ onClick, disabled, variant }) => {
	return (
		<button className={[styles.btn, styles[variant]].join(' ')} onClick={onClick} disabled={disabled}>
			{variant === 'arrowLeft' || variant === 'arrowRight' ? (
				<svg className={styles.icon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 14'>
					<path d='M1.8 0L0 1.75 5.4 7 0 12.25 1.8 14 9 7 1.8 0z'></path>
				</svg>
			) : (
				<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
					<path d='M17.85 4.369A1.26 1.26 0 1 1 19.63 6.15L13.781 12l5.85 5.85a1.26 1.26 0 1 1-1.781 1.781L12 13.781l-5.85 5.85A1.26 1.26 0 1 1 4.37 17.85l5.85-5.85-5.85-5.85A1.26 1.26 0 1 1 6.15 4.37l5.85 5.85 5.85-5.85Z'></path>
				</svg>
			)}
		</button>
	)
}
