import { useLayoutEffect, useState } from 'react'

const queries = ['(max-width: 930px)', '(min-width: 931px)']

export const useMatchMedia = (): { isMobile: boolean; isDesktop: boolean } => {
	const mediaQueryLists: ReturnType<typeof matchMedia>[] = queries.map(query => matchMedia(query))

	const getMatches = () => mediaQueryLists.map(mql => mql.matches)

	const [matches, setMatches] = useState<boolean[]>(getMatches)

	useLayoutEffect(() => {
		const handler = () => setMatches(getMatches)

		mediaQueryLists.forEach(mql => mql.addEventListener('change', handler))

		return () => mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler))
	})

	const [isMobile, isDesktop] = matches

	return { isMobile, isDesktop }
}
