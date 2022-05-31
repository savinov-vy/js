const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');

/*
// количество классов у элемента
console.log(btns[0].classList.length);

// класс который распологается под определённым индексом
console.log(btns[0].classList.item(1));

// добавить класс к элементу, например цвет (можно добавить несколько)
console.log(btns[0].classList.add('red'));
console.log(btns[0].classList.add('red', 'asadfas'));

// удалить класс у элемента
console.log(btns[0].classList.remove('blue'));

// триггер
// если класс есть на элементе то будет убран
// если класса нет на элементе то добавлен
console.log(btns[0].classList.toggle('blue'));
//аналог
btns[0].addEventListener('click', () => {
    if (!btns[1].classList.contains('red')) {
    btns.classList.add('red');
    } else {
    btns[1].classList.remove('red');
    }
});


// проверяет наличие класса на элементе и возвращает boolean
/*if(btns[1].classList.contains('red')) {
    console.log('red');
}

// Добавить событие на все дочерние элементы с использованием родителя
wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.tagName == "BUTTON") {
        console.log('Hello');
    }
});

// Добавить событие на все дочерние элементы с использованием родителя
// через forEach работать не будет т.е. кнопка добавлена после обработчика событий
wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('blue')) {
        console.log('click first button');
    }
});
*/

//добавить кнопку на страницу
const btn = document.createElement('button');
btn.classList.add('red');
wrapper.append(btn);


// Добавить событие на все дочерние элементы с использованием совпадения элемент button с классом red
wrapper.addEventListener('click', (event) => {
    if (event.target && event.target.matches("button.red")) {
        console.log('Hello');
    }
});
