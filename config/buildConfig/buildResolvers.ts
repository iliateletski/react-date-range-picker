import { Configuration } from 'webpack'
import { BuildOptions } from './types/types'

export const buildResolvers = (option: BuildOptions): Configuration['resolve'] => {
	return {
		extensions: ['.tsx', '.ts', '.js']
	}
}
