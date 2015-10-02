'use strict';

var gulp            = require('gulp'),
    rename          = require('gulp-rename'),
    sourcemaps      = require('gulp-sourcemaps'),
    // --- jade plugins
    plumber         = require('gulp-plumber'),
    jade            = require('gulp-jade'),
    merge           = require('merge-stream'),
    // --- postCSS plugins
    postcss         = require('gulp-postcss'),
    rucksack        = require('gulp-rucksack'),
    csswring        = require('csswring'),
    importer        = require('postcss-import'),
    mixins          = require('postcss-mixins'),
    variables       = require('postcss-advanced-variables'),
    // --- require the config variables
    TASKS           = require('./gulp-config/tasks'),
    FILES           = require('./gulp-config/files');
    
    var preRucksack     = [ importer, mixins, variables ];
    var postRucksackn   = [ csswring ];

// require the postCSS plgins, files and tasks paths

// deveolpment style tasks
// --------------------------------------------------------
gulp.task(TASKS.dev.style, function () {

    return gulp.src(FILES.css.source)
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( postcss(preRucksack) )
        .pipe( rucksack({autoprefixer: true, fallbacks: false }) )
        .pipe( sourcemaps.write('.') )
        .pipe( plumber.stop() )
        .pipe( gulp.dest(FILES.css.dest) );
});

gulp.task(TASKS.watch.style, function () {
    gulp.watch( FILES.css.all , [TASKS.dev.style]);
});


// jade task
// --------------------------------------------------------
gulp.task(TASKS.dev.jade, function () {

    // compile jade angularViews 
    var angularViews = gulp.src(FILES.jade.angularViews)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(FILES.jade.dest.angularViews));

    // compile jade others
    var others = gulp.src(FILES.jade.others)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(FILES.jade.dest.others));

    // compile jade index    
    var index = gulp.src(FILES.jade.index)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(FILES.jade.dest.index));

    return merge(angularViews, others, index);

});

gulp.task(TASKS.watch.jade, function () {
    gulp.watch( FILES.jade.all, [TASKS.dev.jade]);
});

// watch all
// --------------------------------------------------------

gulp.task(TASKS.watch.all, function () {
    gulp.watch( FILES.jade.all, [TASKS.dev.jade]);
    gulp.watch( FILES.css.all, [TASKS.dev.style]);
});


// production build
// --------------------------------------------------------
gulp.task(TASKS.production.style, function (){
    
    return gulp.src(FILES.css.source)
        .pipe( plumber() )
        .pipe( postcss(preRucksack) )
        .pipe( rucksack({autoprefixer: true, fallbacks: false}) )
        .pipe( gulp.dest(FILES.css.dest) )
        .pipe( rename({suffix: '.min'}))
        .pipe( postcss(postRucksack) )
        .pipe( plumber.stop() )
        .pipe( gulp.dest(FILES.css.dest) );     

});

gulp.task(TASKS.production.ready, [TASKS.dev.jade , TASKS.production.style], function() {

});

// default
// --------------------------------------------------------
gulp.task(TASKS.default, [TASKS.dev.style, TASKS.dev.jade , TASKS.watch.all], function() {

});