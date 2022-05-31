/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

// Возьмите свой код из предыдущей практики

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const advertising = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),  //<- form.add - форма у которой есть класс add
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]'); // <- с помощью квардратных скобок выбираются элементы имеющие следующий аттрибут            
    

          addForm.addEventListener('submit', (event) => {
              event.preventDefault();

              // получить введёное значение input
              let newFilm = addInput.value;
              // получить boolean состояние checkbox. Галочка установлена или нет.
              const favorite = checkbox.checked;

              if (newFilm){

                // проверить длинну строки
                if (newFilm.length > 21) {
                    // если длинная - обрезать и добавить троеточие
                newFilm = `${newFilm.substring(0, 22)}...`;
                }

                if (favorite) {
                    console.log("Добавляем любимый фильм");
                }
              // добавить значение в массив фильмов
              movieDB.movies.push(newFilm);
              // отсортировать массив
              sortArr(movieDB.movies);

              createMovieList(movieDB.movies, movieList);
              }
              // сбросить значение формы
              event.target.reset();
          });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };  
    
    const makeChahges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("/js/arсhive/027_project_mars/project/img/bg.jpg")';
    };

   
    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            movieList.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                // получаем родительский элемент корзинки для удаления
                btn.parentElement.remove();

                // i это номер элемента в массиве, 1-сколько элементов удалить под этим номером
                movieDB.movies.slice(i,1);

                // вызовем себя для обновления нумерации списка фильмов (в видеоуроке работает у меня нет)
              //  createMovieList(films, parent);
            });
        });
    }


    const sortArr = (arr) => {
        arr.sort();
    };

    deleteAdv(advertising);
    makeChahges();

    // при создании странцы первый раз необходимо проинициализировать список
    createMovieList(movieDB.movies, movieList);
});