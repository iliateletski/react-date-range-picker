import webpack from 'webpack'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildDevServer } from './buildDevServer'
import { buildResolvers } from './buildResolvers'
import { BuildOptions, BuildMode } from './types/types'

export const buildWebpack = (option: BuildOptions): webpack.Configuration => {
	const { mode, paths } = option
	const isDev = mode === 'development'

	return {
		mode: mode ?? 'development',
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true
		},
		module: {
			rules: buildLoaders(option)
		},
		resolve: buildResolvers(option),
		plugins: buildPlugins(option),
		devServer: buildDevServer(option),
		devtool: isDev ? 'inline-source-map' : undefined
	}
}
