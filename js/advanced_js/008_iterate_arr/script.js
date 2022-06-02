'use strict';


const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemar'];

/*
метод forEach просто перебирает массив, но не отдаёт новый массив

метод filter уже фильтрует массив и отдаёт отфильтрованный

*/

// filter 

const shortNames = names.filter(function(name) {
    return name.length < 5;
});

console.log('names with lengt < 5 chars: '+ shortNames);
//-------------------------------------------------------------------------
// map

const answers = ['IvAn', 'AnnA', 'Hello'];

const result = answers.map(item => item.toLocaleLowerCase());

console.log(result);
//-------------------------------------------------------------------------
// every/some: если хотябы один элемент сооствествует условию то вернёт true
// every - каждый елемент удовляетворяет условию
const some = [4, 'qwq', 'sfreferf'];

console.log(some.some(item => typeof(item) === 'number'));

console.log(some.every(item => typeof(item) === 'number'));

//---------------------------------------------------------------------------

//reduce c цифрами
const arrNum = [4, 5, 1, 3, 2, 6];
/*
     итерации   sum  current
        1       0       4  эта строка для понимания на самом деле выполняется сразу вторая строка
        2       4       5  начало тут - при использовании строк будет видно что на самом деле начало тут
        3       9       1
        4       10      3  
        5       13      2
        6       15      6
                21*/    //ответ 21
// sum - сумма аргументов
const resSum = arrNum.reduce((sum, current) => sum + current);
console.log(resSum);

// reduce с строками

const arrStr = ['apple', 'pear', 'plum'];

const resStr = arrStr.reduce((sum, current) => `${sum}, ${current}`);
console.log(resStr);


//=========================== Пример ===============================

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

// entries метод превращает объект в  массив с массивами внутри
const newArr = Object.entries(obj);

console.log(newArr);

const arr = Object.entries(obj)
.filter(item => item[1] === 'persone')
.map(item => item[0]);

console.log(arr);
