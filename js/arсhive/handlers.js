"use strick";

const checkbox = document.querySelector('[type="checkbox"]'),
      addForm = document.querySelector('form.add');

// "submit" - обработчик отправки формы addForm на сервер
    addForm.addEventListener('submit', (event) => { 
          event.preventDefault();
      });

// "click" - клик мыши по по форме addForm
    addForm.addEventListener('click', someThink);

// "mouseenter" - аналог hover - курсор мыши вошёл ы элемент btn
    btn.addEventListener('mouseenter', (event) => {
    console.log(event.target);
}); 

// "DOMContentLoaded" - обработчик запускающий скрипт только после подготовки DOM элементов страницы
/* аналогом является аттрибут defer в например 
<body>
<script defer scr="js/script.js"></script>
<p>Hello world!</p>
<p>Second message</p>
</body>
*/
// с использованем такого аттрибута скрипт можно подключать в начале body, но не рекомендуется помещать в head
document.addEventListener('DOMContentLoaded', () => {
// здесь пишется выполняемый js код для страницы
});

// обработчик инпут
const inputRub = document.querySelector('#inputRub'),
      inputUsd = document.querySelector('#inputUds');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
   // request.open(method, url, async, login, password);

   request.open('GET', 'js/current.json');
   request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   request.send();

});

    // закрытие модального окна при нажатии клавиши "Escape" keydown - нажатие клавиши
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

// событие скролл мыши
    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){  // -1 px это микро bug может событие может не сработать в некоторых браузерах
            openModal();
        }
    });

// событие input
// input просиходит когда чтото вводится либо удаляется из input
// похожее событие change
inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
});


// событие change
// происходит когда кликаешь мышью мимо формы после заполнения формы
inputRub.addEventListener('change', () => {
    const request = new XMLHttpRequest();
});

// событие следит за изменением статуса readyState
request.addEventListener('readystatechange', () => {}); 