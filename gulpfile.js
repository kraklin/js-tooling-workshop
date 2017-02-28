var babel = require('gulp-babel'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    del = require('del');

gulp.task('clean-temp', function(){
  return del(['dest']);
});

gulp.task('es6-commonjs',['clean-temp'], function(){
  return gulp.src(['src/*.js','src/js/*.js'], {base: './src'})
    .pipe(babel())
    .pipe(gulp.dest('dest/temp'));
});

gulp.task('bundle-commonjs-clean', function(){
  return del(['dest/bundle']);
});

gulp.task('commonjs-bundle',['bundle-commonjs-clean','es6-commonjs'], function(){
  return browserify(['dest/temp/index.js']).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest("./dest/bundle"));
});

gulp.task('publish-static',function(){
  return gulp.src(["./src/index.html","./src/images/logo.png","./src/vendor/*","./src/css/*"], {base:'./src'})
    .pipe(gulp.dest("./bundle"))
});

gulp.task('publish-app',['publish-static'],function(){
  return gulp.src(["./dest/bundle/app.js"])
    .pipe(gulp.dest("./bundle"))
});