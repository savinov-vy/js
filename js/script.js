"use strict";

const arr = [1, 2, 3, 6, 8];

// удалить элемент с конца массива
arr.pop();

// добавить элемент в конец массива
arr.push(10);

console.log(arr);

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// для работы с массиво подобными структурами существует способ for of (имеет возможность использовать break или continue )
for (let value of arr) {
    console.log(value);
}

// call back функция выполнится строго после выполения forEach (лучше использовать его если не нужно использовать break или continue )
arr.forEach(function (item, i, arr) {
console.log(`${i}: ${item} внутри массива ${arr}`);
});

// модифицирующие переборы arr.map / arr.reduce / arr.filter
// ==========================================================================

// разбить строку на массив

const str =  prompt("", "");
const products = str.split(", ");

console.log(products);

// объединить элементы массива через разделитель
const out = products.join('; ');
console.log(out + ' as ' + typeof(out));

//============= Сортировка массива =====================

const arrStr = ['aaa', 'ccc', 'bbb'];

arrStr.sort();

console.log(arrStr);

//----

// цифры метод сорт сортирует не правильно - сортировка так же как у слов посимвольная
const num = [2, 4, 3, 14];
num.sort();
console.log(num);

// поэтому  нужно написать call back функцию

function compareNum (a, b) {
    return a - b;
} 

num.sort(compareNum);
console.log(num);


// ========== псевдомассивы ===========

// псевдомассив это структура данных не имеющая методов имеющая только структуру массива и хранит данные по порядку
