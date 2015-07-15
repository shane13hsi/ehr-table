var gulp = require('gulp');
var babel = require('gulp-babel');
var constants = require('../../constants');
var del = require('del');

gulp.task('lib', ['lib:clean'], function() {
  return gulp.src(constants.SRC_DIR + '/table/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(constants.LIB_DIR));
});

gulp.task('lib:clean', function(done) {
  del([constants.LIB_DIR], done);
});