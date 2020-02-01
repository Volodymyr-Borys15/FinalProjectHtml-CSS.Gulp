const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const image = require('gulp-image');
const imagemin = require('gulp-imagemin');
const browser = require('browser-sync').create();

function browserSync(done){
    browser.init({
        server: {
            baseDir: "./build"
        },
        port: 4000
    });
    done();
}

function browserSyncReload(done){
    browser.reload();
    done();
}

const paths = {
    styles: {
        src: 'app/style.css',
        dest: 'build/'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    icons: {
        src: 'app/icons/*.*',
        dest: 'build/icons'
    },
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    }
}
function styles(){ 
    return gulp.src(paths.styles.src)
        .pipe(cssnano())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browser.stream())
}

function html(){
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browser.stream())
}
function images(){
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browser.stream())
}
function icons(){
    return gulp.src(paths.icons.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.icons.dest))
        .pipe(browser.stream())
}
function fonts(){
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browser.stream())
}

function watch(){
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.images.src, images);;
    gulp.watch(paths.icons.src, icons);;
    gulp.watch(paths.fonts.src, fonts);;
    gulp.watch('./app/index.html', gulp.series(browserSyncReload));
}

const build = gulp.parallel(styles, html, images, icons, fonts);

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch,build,browserSync));







