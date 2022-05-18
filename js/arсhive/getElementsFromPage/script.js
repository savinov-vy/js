"use strict";
//025
//Для запуска страница index.html должна находится в корне проекта (скопировать текущий файл в корень)
// DOM (document objects element существует только в браузере)

// так как явно указано что получаем 1 элемент по Id то # прописывать не нужно
const box = document.getElementById('box');
console.log(box);

// указываем что ищем по тегу и получаем псевдо коллекцию даже если элемент
const btns = document.getElementsByTagName('button');
console.log(btns[0]);

// ищем по имени класса, явно поэтому указано только имя класса и получаем коллекцию классов даже если элемент 1
const circles = document.getElementsByClassName('circle');
console.log(circles);


// селектор из более поздних версий js. Явно не укзано по какому элементу ищем поэтому нужно указывать 
// класс . или id # 
// получаем псевдоколлекцию с одним методом forEach
const hearts = document.querySelectorAll('.heart');
hearts.forEach(item => console.log(item));

//querySelector получает первый попавшийся элемент на странце
const oneHeart = document.querySelector('.heart');
console.log(oneHeart);

const oneBox = document.querySelector('#box');
console.log(oneBox);
