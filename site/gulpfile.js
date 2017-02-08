'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    gutil = require('gulp-util'),
    cp = require('child_process'),
    sitemap = require('gulp-sitemap'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        php: 'build/scripts/',
        blog: 'build/blog/'
    },
    jekyll: {
        build: 'jekyll_build/',
        blog: 'jekyll_build/blog/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/css/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'src/scripts/**/*.*'

    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        markdown: 'src/**/*.markdown',
        style: 'src/css/**/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        php: 'src/scripts/**/*.*'

    },
    clean: ['./build', './jekyll_build']
};

var site = {
    url: 'http://codehighlight.com'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

function filter(path, filter) {
    return path + filter;
}

function filterHtml(path) {
    return filter(path, '**/*.html');
}

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll:build', function (done) {
    return cp.spawn('cmd', ('/c jekyll build -s src -d ' + path.jekyll.build).split(' '), {stdio: 'inherit'}).on('close', done);
});

gulp.task('html:copy_blog', ['jekyll:build'], function () {
    console.log('html:copy_blog: ' + filterHtml(path.jekyll.blog));

    gulp.src(filterHtml(path.jekyll.blog))
        .pipe(minifyHTML({quotes: true}))
        .pipe(gulp.dest(path.build.blog));
});

gulp.task('html:build', ['html:copy_blog'], function () {
    gulp.src(filterHtml(path.jekyll.build))
        .pipe(minifyHTML({quotes: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', ['jekyll:build'], function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(prefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('php:copy', function () {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
        .pipe(reload({stream: true}));
});


gulp.task('sitemap:build', function () {
    gulp.src(path.build.html + '**/*.html')
        .pipe(sitemap({
            siteUrl: site.url
        }))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'php:copy',
    'sitemap:build'
]);

gulp.task('watch', function () {
    gulp.watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.markdown], function (event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
    gulp.watch([path.watch.php], function (event, cb) {
        gulp.start('php:copy');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);