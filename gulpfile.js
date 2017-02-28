var babel = require('gulp-babel'),
    gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    del = require('del');

gulp.task('default',['publish-app'], function(){
  return del(['temp']);
});

gulp.task('es6-commonjs', function(){
  return gulp.src(['src/*.js','src/js/*.js'], {base: './src'})
    .pipe(babel())
    .pipe(gulp.dest('temp'));
});

gulp.task('bundle-commonjs-clean', function(){
  return del(['dest/bundle']);
});

gulp.task('bundle-js',['bundle-commonjs-clean','es6-commonjs'], function(){
  return browserify(['temp/index.js']).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest("./temp/bundle"));
});

gulp.task('build-css',function(){
  return gulp.src('./src/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./temp/css'));
});

gulp.task('publish-static',function(){
  return gulp.src(["./src/index.html","./src/images/logo.png","./src/vendor/*","./src/css/*.css"], {base:'./src'})
    .pipe(gulp.dest("./bundle"))
});

gulp.task('publish-css', ['build-css'],function(){
  return gulp.src("./temp/css/*.css")
    .pipe(gulp.dest("./bundle/css"))
});

gulp.task('publish-app',['publish-static', 'bundle-js', 'publish-css'],function(){
  return gulp.src(["./temp/bundle/app.js"])
    .pipe(gulp.dest("./bundle"))
});