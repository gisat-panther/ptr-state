import {babel} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

const CWD = process.cwd();
const Paths = {
	SRC: `${CWD}/src`,
	DIST: `${CWD}/dist`,
	NODE_MODULES: `${CWD}/node_modules`,
};
Object.assign(Paths, {
	INPUT: Paths.SRC + '/index.js',
	OUTPUT: Paths.DIST + '/index.js',
});

const lodashExternal = [
	'lodash/isObject',
	'lodash/indexOf',
	'lodash/isEqual',
	'lodash/find',
	'lodash/map',
	'lodash/remove',
	'lodash/forIn',
	'lodash/chunk',
	'lodash/flatten',
	'lodash/each',
	'lodash/isArray',
	'lodash/difference',
	'lodash/includes',
	'lodash/omit',
	'lodash/union',
	'lodash/sortBy',
	'lodash/reduce',
	'lodash/uniq',
	'lodash/pick',
	'lodash/pickBy',
	'lodash/forEach',
	'lodash/without',
	'lodash/isNumber',
	'lodash/cloneDeep',
	'lodash/merge',
	'lodash/reject',
	'lodash/filter',
	'lodash/isUndefined',
	'lodash/omitBy',
	'lodash/orderBy',
	'lodash/compact',
	'lodash/values',
	'lodash/get',
	'lodash/isMatch',
	'lodash/uniqBy',
	'lodash/intersection',
	'lodash/isEmpty',
	'lodash/head',
	'lodash/tail',
	'lodash/flatMap',
];

const onwarn = warning => {
	// throw on others
	if (warning.code === 'CIRCULAR_DEPENDENCY') {
		throw new Error(warning.message);
	}
};

export default {
	input: 'src/index.js',
	onwarn,
	external: [
		'react/jsx-runtime',
		'react',
		'prop-types',
		'redux',
		'redux-thunk',
		'redux-logger',
		'@manaflair/redux-batch',
		'react-redux',
		'connected-react-router',
		'react-router-dom',
		'react-router',
		'@gisatcz/ptr-utils',
		'@gisatcz/ptr-core',
		'@gisatcz/ptr-tile-grid',
		'path',
		'moment',
		'reselect',
		're-reselect',
		'isomorphic-fetch',
		'query-string',
		'@tackworld.com/rereselct',
		'@jvitela/recompute',
		'fast-stringify',
		/@babel\/runtime/,
		...lodashExternal,
	],
	output: {
		file: {
			es: 'dist/index.es.js',
			cjs: pkg.main,
		}[env],
		format: env,
		globals: {
			// 'lodash/random': '_.random'
		},
		exports: 'named' /** Disable warning for default imports */,
		sourcemap: true,
	},
	plugins: [
		babel({
			plugins: ['lodash'],
			babelHelpers: 'runtime',
		}),
		commonjs({
			include: 'node_modules/**',
		}),
		filesize(),
	],
};
