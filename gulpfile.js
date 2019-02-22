const gulp = require ("gulp");
const sass = require ('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');



function showError(err) {
    notifier.notify({
        title: 'ZJEBAŁAŚ',
        message: err.messageFormatted
    });

    console.log(err.messageFormatted);
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false,
    });
});


gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed'
      }).on('error', showError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
  });

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', function (){
    console.log('rozpoczynam pracę');
    gulp.start(['browser-sync','sass','watch']);
});