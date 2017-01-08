var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    cssnested = require('postcss-nested'),
    concat = require('gulp-concat'),
	  browserSync= require('browser-sync').create();

 



// Servidor de desarrollo

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:''
		}
	})
});

// Tarea para procesar el js
gulp.task('concat', function() {
  return gulp.src(['./src/js/app.js','./src/js/PokemonController.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

//Tarea para procesar el css
gulp.task('css',function(){
  var processors = [
    cssnested,
    cssnext({browsers:['> 5%','ie 8']})
  ];
	return gulp.src('./src/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream())
});

// Tarea para vigilar los cambios

gulp.task('watch',function(){
  gulp.watch('./src/*.css',['css'])
  gulp.watch(['./src/js/app.js','./src/js/PokemonController.js'],['concat'])
  gulp.watch('/index.html').on('change',browserSync.reload)
});

gulp.task('default',['watch','serve'])