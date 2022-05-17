"use strict";

let num = 20;

showFirstMessage("Hello World");
// function declaration - функции загружаеются вместе с переменными var до выполнения кода поэтому можно вызывать
// функцию из любого места кода
function showFirstMessage(text) {
    console.log(text);
}

showFirstMessage("Another text");

//==========================================================================


// function expression
// такая функция загружается как обычная переменная в процессе выполнения кода
// поэтому нельзя её вызывать до объявления

let calc = function (a, b) {
    return a + b;
};

console.log(calc(4, 5));


//============================================================================

// стрелочные функции
//
//
const anyFunc = (a, c) => {return a + c;};

console.log(anyFunc(7, 9));