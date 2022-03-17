"use strict";

const numberOfFilms = +prompt('Сколько фильмов вы уже просмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    generes: [],
    private: false
};

for (let i = 0; i < 2; i++) {

    const a = prompt('Один из последних просмотренных фильмов', ''),
        b = prompt('На сколько вы его оцените', '');

    if (a != null && b != null && a != '' && b != '' && a.length < 50) {

        personalMovieDB.movies[a] = b;
        console.log('done');
    } else {
        alert("Назавание должно быть меньше 50 но больше 0 символов");
        console.log('error');
        i--;
    }

}

if(personalMovieDB.count < 10) {
    console.log('Просмотрено мало фильмов');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log('Вы среднестатический зритель');
} else if (personalMovieDB.count > 30) {
    console.log('Фильмов очень много');
}
