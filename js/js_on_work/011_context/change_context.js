 'use strict';

 /*
 1) Обычная функция: this = window, но если use strict - undefined
 2) Контекст у методов объекта - сам объект
 3) this в конструкторах и классах - это новый экземпляр объекта
 4) Ручная привязка к this
 
 */ 

//-------------------------------------------------------------------------
/* 1) Обычная функция: this = window, но если use strict - undefined
function showThis(){
   console.log(this);
} */

//showThis();
//----------------------------------------------------------------------------
/* function showThis1(a, b){
    console.log(this);
    function sum() {
        console.log(this);  // здесь будет undefined -> см. отличие от стролчной функции
    return a + b;
}
console.log(sum());
}

showThis1(4, 5); */
//---------------------------------------------------------------------------

// 2) Контекст у методов объекта - сам объект
/* 
const obj = {
a: 20,
b: 15,
sum: function() {
    console.log(this);  
}
};
obj.sum(); */

// если вызов функции происходит в функции то это уже не функция объекта
// в этом случае контекст вызова теряется и это относится уже к 2му варианту - вызов вне объекта

/* 
const obj1 = {
    a: 20,
    b: 15,
    sum: function() {
        function shout() {
        console.log(this); // это простой вызов функции он не относится к контексту объекта - undefined
        }
        shout();   
    }
    };
obj1.sum();

 */

//--------------------------------------------------------

/*function User(name, id) {
this.name = name;
this.id = id;
this.human = true;

this.hello = function() {
console.log('Hello ' + this.name);
};
}*/

// 3) this в конструкторах и классах - это новый экземпляр объекта

//=============================== Смена контекста вызова фукнции =====================
/*
function sayName(surname) {
    console.log(this);
    console.log(this.name + ' ' + surname);
}


const user = {
    name: 'John'
};

sayName.call(user, 'Smith');
sayName.apply(user, ['Smith']);

// для смены контекста вызова функции применяются методы call и apply 
// отличаются только разной передачей аргументов для функции
// call аргументы передаются через запятую после передачи контекста
// apply аргументы передаются в массиве
// если нет агументов разницы в синтаксисе apply и call - нет

// 4) Ручная привязка к this

function count(num) {
    return this*num;
}

const double = count.bind(2); // привязываем контекст к функции count для этого создали новую функцию

console.log(double(4));

// двойка переходит в функцию как this
// bind создаёт НОВУЮ ФУНКЦИЮ и под неё уже подвязывает контекст
*/

//===============================================================================
//=========================== РАБОТА С ЭЛЕМЕНТАМИ ===============================
//===============================================================================

const btn = document.querySelector('button');
/*
// если функция написана как function(){} то контекстом вызова будет сам элемент на котором произошло
// событие
btn.addEventListener('click', function(){
    console.log(this);
    this.style.background = 'red';
});

*/
// отличие стрелочной функции от объявления function
// стрелочная функция берёт контекст своего родителя. Родителем является function()
// context function() это объект obj
// следовательно в этом случае выведется не undefined, а obj

const obj = {
    num: 5,
    sayNumber: function() {
        const say = () => {
            console.log(this);
        };

        say();
    }
};

obj.sayNumber();


const double = (a) => {
    return a * 2; 
};

const doubleShort = a => a * 2;

console.log(doubleShort(4));

// таким образом если заменить function на стрелочную функцию
// будет ошибка потому что контекст вызова функции потерялся
// this можно использовать когда function прописан, а не стрелочная функция
/*
btn.addEventListener('click', () => {
    this.style.backgroundColor = 'red';
});
*/

// для обращения к элементу из стрелочной функции нужно использовать event.target

btn.addEventListener('click', (event) => {
    event.target.style.backgroundColor = 'red';
});



