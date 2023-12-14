import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development'

	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
	}

	const cssLoader = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: '[name]__[local]--[hash:base64:5]'
			}
		}
	}

	const postCssLoader = {
		loader: 'postcss-loader'
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, cssLoader, postCssLoader, 'sass-loader']
	}

	return [tsLoader, scssLoader]
}
