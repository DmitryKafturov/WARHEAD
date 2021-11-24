'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('./src/sass/style.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({ stream: true }));

});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './src'
        },
        notify: false
    });
});

gulp.task('code', function () {
    return gulp.src('./src/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));