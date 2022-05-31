'use strict';

// document - структура элементов DOM
// window - окно браузера через которое видно контент
// screen - монитор пользователя (практически не используется)


const box = document.querySelector('.box'),
      btn = document.querySelector('button');

//const whidth = box.clientWidth;
//const height = box.clientHeight;
// значения clientWidth, clientHeight и остальные идут без 'рх' (просто голые цифры)

const whidth = box.scrollWidth;
const height = box.scrollHeight;

console.log(whidth, height);

//box-sizing: border-box; свойство которое включает border внутрь with
// элементы нельзя модифицируют кроме элементов scrollTop
// для поднятия scroll в нужное положение на верх страницы можно установить scrollTop в нулевое положение


window.scrollBy(0, 400); // про скролллить относительно текущего элемента на 400 вниз

window.scrollTo(0, 400); // про скролллить относительно всей страницы на 400 вниз


// scrollHeight; scrollHeight;  -высота и ширина с учётом прокрутки (не включая полосу прокрутки)

btn.addEventListener('click', () => {
    //box.style.height = box.scrollHeight + 'px'; //развернуть box полностью в высоту
    console.log(box.scrollTop);
});


//====================== расчитать координаты в js ==========================
// координаты начинаются от левого верхнего угла (не как в css - правый нижний)
// координата right это когда с левой стороны ведём в право

console.log(box.getBoundingClientRect()); // < получить все координаты объекта

console.log(box.getBoundingClientRect().top); // < получить только top


//====================== получить стили элемента ================================

const style = window.getComputedStyle(box); //получить все примененные к елементу стили (computed styles) мы используем
//                                           в javascript используются inline стили
console.log(style.display); // стилей очень много - получить конкретное свойство можно через точку
