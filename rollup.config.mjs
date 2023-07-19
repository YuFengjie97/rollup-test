import typescript from '@rollup/plugin-typescript' // rollup使用typescript，必须用这个，另外，tslib也要装
import resolve from '@rollup/plugin-node-resolve' // 如果引用了外部包（npm 装在node_modules里的那些），需要这个去解析，然后打包在一起
import strip from '@rollup/plugin-strip' // 清除调试代码
import postcss from 'rollup-plugin-postcss' // 支持js引入css，scss，less
import autoprefixer from 'autoprefixer' // css自动前缀
import commonjs from '@rollup/plugin-commonjs' // 可以使用commonjs模块的包了
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/index.ts',
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      plugins: [autoprefixer()],
    }),
    strip(),
    livereload(),
    serve({
      open: true,
      port: 8080,
      contentBase: '',
    }),
  ],
}
