import coverage from 'rollup-plugin-coverage';
import common from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import transform from 'rollup-plugin-buble';
const env = process.env.NODE_ENV || 'test'; // eslint-disable-line no-process-env
export default {
  input: env === 'test' ? 'test/index.js' : 'index.js',
  output: {
    file: env === 'test' ? 'type-detect.test.js' : 'type-detect.js',
    name: 'typeDetect',
    format: 'iife',
  },
  plugins: [
    env === 'test' ? coverage({ exclude: 'test/*.js' }) : null,
    common(),
    resolve(),
    transform(),
  ].filter(Boolean),
};
