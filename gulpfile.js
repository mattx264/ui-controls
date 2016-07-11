var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

var src='./src/**/*.js',
    dest='./dist/'
gulp.task('min', function () {
  gulp.src(src)
    .pipe(concat('ui-controls.min.js'))
    .pipe(uglify())
   
    .pipe(gulp.dest(dest));
})
gulp.task('default', function () {
  return gulp.src(src)
    .pipe(concat('ui-controls.js'))
    .pipe(gulp.dest(dest));
});