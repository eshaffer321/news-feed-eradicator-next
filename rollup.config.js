import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import svelte from 'rollup-plugin-svelte';
import { string } from 'rollup-plugin-string';

const plugins = [
        svelte({ emitCss: true }),
        resolve(),
	commonjs(),
	typescript(),
	replace({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		preventAssignment: true,
	}),
	string({
		include: "**/*.str.css"
	}),
];

const intercept = {
	input: 'src/intercept.ts',
	output: {
		file: 'build/intercept.js',
		format: 'iife',
		name: 'Intercept',
	},
	plugins: [...plugins, css({ exclude: '**/*.str.css', output: 'build/eradicate.css' })],
};

const options = {
	input: 'src/options/options.ts',
	output: {
		file: 'build/options.js',
		format: 'iife',
		name: 'Options',
	},
	plugins: [...plugins, css({ exclude: '**/*.str.css', output: 'build/options.css' })],
};

const background = {
	input: 'src/background/service-worker.ts',
	output: {
		file: 'build/service-worker.js',
		format: 'iife',
		name: 'ServiceWorker',
	},
	plugins,
};

export default [intercept, options, background];
