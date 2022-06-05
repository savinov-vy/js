"use strict";

// new RegExp('pattern', 'flags');
// /pattern/f

const ans = prompt('Введите ваше имя');
const reg = /n/i; 

// классы
//  \d - ищем цифры
//  \w - все буквы
//  \s - все пробелы

// обратные классы
// \D - не цифры
// \W - не буквы

// флаги
// i - не зависимо от регистра
// g - несколько вхождений
// m - многострочный режим



console.log(ans.search(reg)); //найти маленькую букву n, при использовании flag = i любой регистр


console.log(ans.match(reg)); // более мощный чем search

///////////////////////////////////////////

const pass = prompt('Password');
console.log(pass.replace(/./g, "*"));
//   . - взять все символы заменить на звёздочки флаг g - все символы

console.log('12-34-56'.replace(/-/g, ':')); // все дифисы заменить на двоеточия


/////////////////////////////////////////////

const reg1 = /n/ig;
console.log(reg1.test(ans)); // есть ли строка n в ответе


/////////////////////////////////////////////

const str = 'My name is R2D2';  //вытащить оттуда R2D2

console.log(str.match(/\w\d\w\d/i));


