// установить таймаут (timeout) задержка срабатывания функции
// первым аргуиментом функция вторым время через которое нужно запустить, мс
const timerId1 = setTimeout(function() {
    console.log('Hello');
}, 2000);

//-----

const timerId2 = setTimeout(function(text) {
    console.log(text);
}, 2000, 'some text');

//------

const timerId3 = setTimeout(logger, 2000);

function logger() {
    console.log('text');
}

//==========
//сбросить выполнение функции - остановить счётчик выполнения
clearInterval(timerId3);


//==========
// пример выполнения

const btn = document.querySelector('.btn');
let timerId;
      
btn.addEventListener('click', () => {
    timerId = setTimeout(logger1, 2000);
});

// функция не отработает т.к. setTimeout назначен только после клика
// а clearInterval выполнится по ходу выполнения кода (setTimeout не назначен)
clearInterval(timerId);

function logger1 () {
    console.log('!!text!!');
    i++;
    if (i ===3) {
        clearInterval(timerId);
    }
}


// интервал
// используется если действие необходимо повторять через заданное время
setInterval(logger1, 5000);


// рекурсивный вызов set timeout
let id = setTimeout(function log() {
    console.log('Hello');
    id = setTimeout(log, 500);
}, 500);
