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
