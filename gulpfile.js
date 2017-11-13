'use strict'

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    browsersync = require('browser-sync').create();


gulp.task('concat',function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest("js"));
});

gulp.task('minify', ['concat'], function(){
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task("compileSass", function(){
    return gulp.src("scss/app.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browsersync.stream());
});

gulp.task("watch", function () {

    browsersync.init({
        server: "./"
    });

   gulp.watch('scss/**/*.scss',['compileSass']).on('change', browsersync.reload);
});

gulp.task("clean", function () {
    del('dist', 'css/app.css*', 'js/app*.js*');
})

gulp.task("serve", ["watch"]);

gulp.task("build", ["minify","compileSass"], function(){
    return gulp.src(["css/app.css, js/app.min.js,index.html","images/**"], { base: "./"})
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean"], function () {
    gulp.start('build');
});