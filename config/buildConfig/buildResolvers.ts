import { Configuration } from 'webpack'
import { BuildOptions } from './types/types'
import path from 'path'

export const buildResolvers = (option: BuildOptions): Configuration['resolve'] => {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		// roots: [path.resolve('')]
		alias: {
			components: '/src/components/',
			helpers: '/src/helpers/',
			types: '/src/types/',
			hooks: '/src/hooks/'
		}
	}
}
