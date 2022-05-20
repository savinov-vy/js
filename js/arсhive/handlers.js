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
