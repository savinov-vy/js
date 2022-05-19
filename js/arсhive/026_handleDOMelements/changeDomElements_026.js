'use strict';

// РАБОТА СО СТИЛЯМИ


// элементы можно получить через document или через уже полученные элементы
// проверить работоспособность методов для различных браузеров можно на сайте https://caniuse.com/?search=prepend

const box = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circles = document.getElementsByClassName('circle'),
      wrapper = document.querySelector('.wrapper'),
      hearts = wrapper.querySelectorAll('.heart'),
      oneHeart = wrapper.querySelector('.heart');



      //вывести в консоль все свойства и методы объекта
console.dir(box);

// поменять цвет объекта box;`
box.style.backgroundColor = 'blue';

// поменять ширину объекта box;
//box.style.width = '500px';

// кнопка подобие овала
btns[1].style.borderRadius = '100%';

// поменять цвет фона круга
circles[0].style.backgroundColor = 'red';

// поменять несколько css стилей одновременно
// прописывать нужно прямо как это было бы написано в css
// box.style.cssText = 'background-color: blue; with: 500px';

// менять динамически стили с помощью интерполяции
//box.style.cssText = `background-color: blue; with: ${num}px`;


// действия сразу с несколькими элементами с помощью цикла (циклы практически не используются)
// for (let i = 0; i < hearts.length; i++) {
//    hearts[i].style.backgroundColor = 'blue';
// }

// действия сразу с несколькими элементами с forEach (единственный метод псевдомассивов полученных через querySelector)
hearts.forEach(item => {
    item.style.backgroundColor = 'blue';
});

//-------------- РАБОТА С ЭЛЕМЕНТАМИ DOM------------------------------------------------

// создать новый элемент - элемент сейчас существует только в javascript (на странице его сейчас нет)
const div = document.createElement('div');
div.style.height = "AUTO";

// создать текст (практически не используется)
const text = document.createTextNode('Тут был я');

// добавить класс к элементу div (div по прежнему только в css)
div.classList.add('black');

// добавить элемент в конец body современным способом
document.body.append(div);

// вставить элемент в конец wrapper - если элемент далее по коду больше не используется то можно 
// не выносить его в отдельную переменную
document.querySelector('.wrapper').append(div);

// если по коду используется дальше то нужно вынести в отдельную переменную
const wrapperTMP = document.querySelector('.wrapper');

// вставить div в конец элемента wrapper
wrapper.append(div);

// вставить div в начало элемента wrapper
wrapper.prepend(div);

// вставить div перед каким либо элементом
hearts[1].before(div);

// вставить div после какого либо элемента
hearts[1].after(div);

// удалить элемент со страницы
circles[2].remove();

// заменить элемент другим элементом
// какой элемент хотим заменить (сердце) -> каким элементом хотим заменить (кругом)
hearts[0].replaceWith(circles[0]);


//---------------------- УСТАРЕВШИЕ КОНСТРУКЦИИ -----------------------------------------------
// в отличие от современных необходимо всегда действовать от имени родительского элемента
// таким образом нужено всегда знать родительский элемент

// вставить дочерний элемента
// wrapper.appendChild(div);

// вставить перед (вставляемый элемент, перед каким вставить)
// wrapper.insertBefore(div, hearts[1]);

// удалить элемент из родительского элемента удалить дочерний
// wrapper.removeChild(hearts[1]);

// заменить элемент другим элементом
// wrapper.replaceChild(div, hearts[1]);

//----------------------- ВСТАВИТЬ ТЕКСТ ИЛИ HTML ПРЯМО В ЭЛЕМЕНТЫ -----------------------------

// вставить HTML к какому либо блоку
 div.innerHTML = "<h2>Hello World<h2>";

// данные полученные от пользователя в целях безопасности нужно использовать через textContent
// иначе пользователь может использовать эту уязвимость вплоть 
// до уничтожения каких либо данных сайта (по примеру sql инъекций)
 div.textContent = "<h2>Hello World<h2>";


// вставить HTML до какого либо элемента (перед началом)
div.insertAdjacentHTML("beforebegin", "<h3>!beforebegin!</h3>");

// вставить HTML в самый конец какого либо элемента
div.insertAdjacentHTML("beforeend", "<h3>!beforeend!</h3>");

// вставить HTML в после элемента
div.insertAdjacentHTML("afterend", "<h3>!afterend!</h3>");


// вставить HTML в начало элемента
div.insertAdjacentHTML("afterbegin", "<h3>!afterbegin!</h3>");