// variable definition
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concatJs = require('gulp-concat');

// Tasks
gulp.task('welcome-task',async function () {
    
    return console.log("hello");
});

// Task to copy file
gulp.task('copy-files',function () {
    
    return gulp.src('src/css/*.css')
                .pipe(gulp.dest('dist/css'));
});

//Task to compile sass file to css
gulp.task('sass',function () {

    return gulp.src('src/sass/styles.scss')
                .pipe(sass())
                .pipe(gulp.dest('dist/css'));
});

//Minify js
gulp.task('minify-js',function () {
    
    return gulp.src('src/js/*.js')
                .pipe(uglify())
                .pipe(gulp.dest('dist/js'));
});

//Concatenate Js Files
gulp.task('concat-js', function () {

    return gulp.src('src/js/*.js')
        .pipe(concatJs('concatapp.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watcher Function
gulp.task('watch',function () {
    gulp.watch('src/js/*.js', gulp.series('concat-js'));

    gulp.watch('src/sass/styles.scss', gulp.series('sass'));
});

// Default Task
//gulp.task('default',['welcome-task','watch']);
gulp.task('default', gulp.parallel('welcome-task','watch'));