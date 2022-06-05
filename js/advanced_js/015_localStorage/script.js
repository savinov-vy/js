"use strict";

/*
localstorage - мини база данных в браузере. Работает по принципу ключ - значение
может хранить в себе до 5 Мб данных

посмотреть можно в посмотреть код вкладка application

*/
// основные команды
/*
// добавить значение (ключ number)
localStorage.setItem('number', 5);

// получить значение по ключу
localStorage.getItem('number');

// удалить значение по ключу
localStorage.removeItem('number');

// удалить все значения данного url
localStorage.clear();*/


//-------------- checkbox checked если его изменяли запомнить положение checkbox -----------------

const checkbox = document.querySelector('#checkbox'),
      form = document.querySelector('form'),
      change = document.querySelector('#color');

      // если в локалсторадж есть значение true то установим checkbox в значение true
if (localStorage.getItem('isChecked')) {
    checkbox.checked = true;
}

// навесим запомининие галочки если она хоть раз изменялась
checkbox.addEventListener('change', () => {
    localStorage.setItem('isChecked', true);
});


//------------- кнопка изменяет цвет формы ---------------------

if (localStorage.getItem('bg') === 'changed') {
    form.style.backgroundColor = 'red';
}

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed'){
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    } else {
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

// ------- запись о человеке сохранить в localstorage -----------

const person = {
    name: 'Alex',
    age: 25
};

const serializedPerson = JSON.stringify(person);
localStorage.setItem('alex', serializedPerson);

console.log(JSON.parse(localStorage.getItem('alex')));

