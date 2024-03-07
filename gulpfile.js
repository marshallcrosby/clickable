/// <binding ProjectOpened='build' />
'use strict';

// Gulp stuff
const { src, dest, series, parallel, watch } = require('gulp');

// Styles
const sass = require('gulp-dart-sass');
const concat = require('gulp-concat');

// Javascript
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");

// Markup
const twig = require('gulp-twig');

// Live server
const connect = require('gulp-connect');
const open = require('gulp-open');

const styles = () => {
    return src(['src/scss/**/*.scss'],
        { sourcemaps: true })
        .pipe(concat('clickable.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css', { sourcemaps: '.' }))
        .pipe(connect.reload());
}

const js = () => {
    return src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(rename(function (path) {
            if (!path.basename.includes(".min")) {
                path.extname = ".min.js";
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'))
        .pipe(connect.reload());
}

const markup = () => {
    return src(['src/**/*.twig'])
        .pipe(twig())
        .pipe(dest('dist'))
        .pipe(connect.reload());
}

const server = (cb) => {
    watch('src/scss/**/*.scss', series(styles));
    watch('src/js/**/*.js', series(js));
    watch('src', series(markup));

    connect.server({
        root: 'dist/',
        livereload: true
    });

    setTimeout(() => {
        open({ uri: 'http://localhost:8080/' });
        cb();
    }, 2000);

}

const build = series(parallel(styles, js), markup);

exports.build = build;
exports.server = series(build, server);
exports.default = exports.server;