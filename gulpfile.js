const { watch, src, dest, series } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')
const clean = require('gulp-clean')
const copy = require('gulp-copy')
const babel = require('gulp-babel')
const babelMinify = require('gulp-babel-minify')

function cleanDistDir () {
  return src('dist', { read: false, allowEmpty: true }).pipe(clean())
}

function minifyHtml () {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/src'))
}

function browserSyncTask () {
  return browserSync.init({
    server: {
      baseDir: './dist/src'
    }
  })
}

function transpileSass () {
  return src(['src/assets/sass/**/*.scss', '!_*.scss'])
    .pipe(sass())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/src/assets/css'))
    .pipe(browserSync.stream())
}

function babelTask () {
  return src('src/assets/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(babelMinify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(dest('dist/src/assets/js'))
}

function copyFiles () {
  return src(['src/assets/**', '!src/assets/sass/**', '!src/assets/js/**']).pipe(copy('dist'))
}

function watchFiles (cb) {
  watch('src/*.html', minifyHtml).on('change', browserSync.reload)
  watch('src/assets/sass/**', transpileSass)
  watch('src/assets/js/**', babelTask).on(
    'change',
    browserSync.reload
  )
  watch('src/assets/sass/**/_*.scss', browserSync.reload)
  watch(['src/assets/**', '!src/assets/sass/**', '!src/assets/js/**'], copyFiles).on(
    'change',
    browserSync.reload
  )
  cb()
}

exports.build = series(cleanDistDir, minifyHtml, transpileSass, copyFiles)

exports.default = series(
  cleanDistDir,
  minifyHtml,
  transpileSass,
  copyFiles,
  babelTask,
  watchFiles,
  browserSyncTask
)
