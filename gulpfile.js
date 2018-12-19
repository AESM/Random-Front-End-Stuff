// gulpfile.js

////= RAPTORFrame Gulp Tasks
//============================================================================//

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    uglifyJS = require('gulp-uglify-es').default,
    path = require('path');

var resourcePath = {
      'stylesource': './resources/style',
      'scriptsource': './resources/scripts',
    },
    sourcePath = {
      'scss': './stylesheets/**/*.scss',
      'js': './javascripts/**/*.js',
    };

//== Functions ================================================================/

/// Errors are reported in terminal and `watch` isn't broken by them
/// SOURCE: http://stackoverflow.com/a/23973536
function handleError(error) {
  console.error(error.toString());
  this.emit('end');
}

//== Tasks ====================================================================/

gulp.task('minification', function() {
  return gulp
    .src(sourcePath.scss)
    .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(sass())
      .on('error', handleError)
      .pipe(minifyCSS())
      .pipe(concat('main.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(resourcePath.stylesource));
});

gulp.task('uglification', function() {
  return gulp
    .src(sourcePath.js)
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(uglifyJS())
      .on('error', handleError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(resourcePath.scriptsource));
});

//== Management Tasks =========================================================/

gulp.task('watch', function() {
  gulp.watch(sourcePath.scss, gulp.series('minification'));
  gulp.watch(sourcePath.js, gulp.series('uglification'));
});

gulp.task('build', gulp.series('minification', 'uglification'));

gulp.task('default', gulp.series('build', 'watch'));
