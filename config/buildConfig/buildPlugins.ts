import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { Configuration } from 'webpack'
import { BuildOptions } from './types/types'
import { Options } from 'eslint-webpack-plugin'

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
	const eslintOptions: Options = {
		extensions: ['js', 'ts', 'tsx']
	}

	const plugins: Configuration['plugins'] = [new MiniCssExtractPlugin(), new ESLintPlugin(eslintOptions)]

	return plugins
}
