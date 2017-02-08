'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    browserSync = require("browser-sync"),
    gutil = require('gulp-util'),
    cp = require('child_process'),
    sitemap = require('gulp-sitemap'),
    reload = browserSync.reload,
    ftp = require('gulp-ftp'),
    privateConfig = require('./gulp-config.json');

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
        blog: 'jekyll_build/blog/',
        rss: 'jekyll_build/*.xml'
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

function filterAny(path) {
    return filter(path, '**/*.*');
}

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('clean', function () {
    return del.sync(path.clean);
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll:build', function (done) {
    return cp.spawn('cmd', ('/c jekyll build -s src -d ' + path.jekyll.build).split(' '), {stdio: 'inherit'}).on('close', done);
});

gulp.task('html:copy_blog', ['jekyll:build'], function () {
    return gulp.src(filterHtml(path.jekyll.blog))
        .pipe(minifyHTML({quotes: true}))
        .pipe(gulp.dest(path.build.blog));
});
gulp.task('rss:copy_feed', ['jekyll:build'], function () {
    return gulp.src(path.jekyll.rss)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('html:build', ['html:copy_blog'], function () {
    return gulp.src(filterHtml(path.jekyll.build))
        .pipe(minifyHTML({quotes: true}))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', ['jekyll:build'], function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(prefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    return gulp.src(path.src.img)
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
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('php:copy', function () {
    return gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
        .pipe(reload({stream: true}));
});

//TODO: copy RSS FEED.

gulp.task('sitemap:build', ['html:build'], function () {
    return gulp.src(filterHtml(path.build.html))
        .pipe(sitemap({
            siteUrl: site.url
        }))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('build', [
    'clean',
    'html:build',
    'rss:copy_feed',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'php:copy',
    'sitemap:build'
]);

gulp.task('site:deploy', ['build'], function () {
    return gulp.src(filterAny(path.build.html))
        .pipe(ftp(privateConfig.ftp_settings))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
});

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