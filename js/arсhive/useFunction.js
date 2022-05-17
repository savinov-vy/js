"use strict";

let numberOfFilms;

function start() {
    do {

        numberOfFilms = +prompt('Сколько фильмов вы уже просмотрели?', '');

    } while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms));
}

// start();

// rememberMyFilms();

// detectPersonalLevel();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    generes: [],
    private: false
};


showMyDb(personalMovieDB.private);
writeYourGeneris();


function showMyDb(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}

function writeYourGeneris(){
    for (let i = 1; i < 4; i++){
       personalMovieDB.generes[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, ``);
    }

}



function rememberMyFilms() {
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
}


function detectPersonalLevel() {

    if (personalMovieDB.count < 10) {
        console.log('Просмотрено мало фильмов');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log('Вы среднестатический зритель');
    } else if (personalMovieDB.count > 30) {
        console.log('Фильмов очень много');
    }
}