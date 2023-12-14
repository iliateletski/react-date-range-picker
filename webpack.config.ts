import path from 'path'
import webpack from 'webpack'
import { buildWebpack } from './config/buildConfig/buildWebpack'
import { BuildMode, BuildPaths } from './config/buildConfig/types/types'

interface EnvVariables {
	mode: BuildMode
	port: number
}

export default (env: EnvVariables) => {
	const isDev = env.mode === 'development'

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: path.resolve(__dirname, 'build')
	}

	const config: webpack.Configuration = buildWebpack({
		mode: env.mode ?? 'development',
		port: env.port ?? 3000,
		paths
	})
	return config
}
