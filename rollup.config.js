import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'js/app.js',
  output: {
    file: 'dist/bundle.rollup.js',
    format: 'iife',
    globals: {
      'dayjs/plugin/relativeTime': 'relativeTime',
      dayjs: 'dayjs',
      xStore: 'xStore',
      lil: 'lil-uuid',
      ConfettiGenerator: 'confetti-js'
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/*' }),
    uglify()
  ]
};
