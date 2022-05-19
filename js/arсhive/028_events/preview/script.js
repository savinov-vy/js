'use strict';

const btn = document.querySelector('button'),
      btns = document.querySelectorAll('button'),
      btn2 = document.querySelector('#btn2'),
      overlay = document.querySelector('.overlay');


/* в реальном проекте такой способ не используется по причине того
 что если подключить второй обработчик событий, то первый обработчик перезатрётся */
// btn.onclick = function(){
//    alert('Click');
// };

// этот (второй) обработчик перезатрёт первый
// btn.onclick = function(){
//    alert('Second click');
// };

// для добавления обработчиков событий всегда используются addEventListener
// он позволяет добавлять несколько действий
/* btn.addEventListener('click', () => {
    console.log('Click');
});

btn.addEventListener('click', () => {
    console.log('Second Click');
});

btn.addEventListener('mouseenter', () => {
    console.log('Hover');
}); */


//--получить данные о элементе (например координаты элемента) с которым осуществляется взаимодействие
// при распечатке у события объекта есть свойство target. target это прямо тот элемент на котором произошло событие 
/*btn.addEventListener('mouseenter', (event) => {
    console.log(event);
}); */


// вывод в консоль <button id="btn">Нажми меня</button> следовательно можно изменять прямо этот элемент
/* btn.addEventListener('mouseenter', (event) => {
    console.log(event.target);
}); */

// например удалить этот элемент (обработчик повешан только на первую кнопку - querySelector)
// btn.addEventListener('click', (event) => {
//    event.target.remove();
// });

// чтобы удалить обработчик событий нужна ссылка на этот обработчик
// иначе обработчик не удалится (2 похожих объекта не один и тот же объект)
// сработать событие только одни раз
let i = 0;
const printTarget = (event) => {
    console.log(event.target + '!!!');
    i++;
    if(i==1){
        btn.removeEventListener('click', printTarget);
    }
};

btn.addEventListener('click', printTarget);


// высплытие события - событие срабатывает на вложенном элементе, а затем поднимается 
// если один и тот же обработчик навешен на объект и на родительский элемент
// сначала сработает внутренний элемент, а затем поднимется и отработает родительский
btn2.addEventListener('click', printTarget);
overlay.addEventListener('click', printTarget);

/* отменить стандартное поведение браузера (переход по ссылке, выделение текста при
    зажатой кнопке мыши, отправка данных на сервер при нажатии кнопки)
    у объекта события для этого специально сущенствует метод
*/

const link = document.querySelector('a');

link.addEventListener('click', (event) => {
    event.preventDefault(); // <- метод отменяющий стандартное поведение события

    //дальнейшая обработка по необходимости
    console.log(event.target);
});

/* 
    на все кнопки навесить одинаковые обработчики
*/

const someThink = function() {
    console.log('someThink' + '!!!');
};

btns.forEach( btn => {
btn.addEventListener('click', someThink);
});