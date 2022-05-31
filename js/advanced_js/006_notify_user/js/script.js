"use strict";
window.addEventListener('DOMContentLoaded', () => {

    //=================================003_tabs==================================================

    const tabs = document.querySelectorAll('.tabheader__item'),
                 tabsContent = document.querySelectorAll('.tabcontent'),
                 tabsParent = document.querySelector('.tabheader__items');

    
    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';               // скрыто для плавного переключения
            item.classList.add('hide');                  // добавлено для плавного переключения
            item.classList.remove('show', 'fade');       // добавлено для плавного переключения
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        //tabsContent[i].style.display = 'block';                      // скрыто для плавного переключения
        tabsContent[i].classList.add('show', 'fade');                  // добавлено для плавного переключения
        tabsContent[i].classList.remove('hide');                       // добавлено для плавного переключения
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();  // по умолчанию (если параметры не переданы) будет 0 showTabContent(i = 0)

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;


        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //====================================006_timer===============================================

    const deadline = '2024-05-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),  //получим количество миллисекунд в передаваемом времени
              days = Math.floor(t / (1000 * 60 * 60 * 24)),      //округление до ближайшего целого
              hours = Math.floor((t /(1000 * 60 * 60) % 24)),     // остаток от деления чтобы убрать излишки периодов
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

              return {      // вернём объект чтобы вернуть все расчётные значения
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds,
              };
        
    }

    function getZero(num) {                 // функция подстановки нуля для чисел с одним разрядом
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();  // чтобы не было мигания верстки (timeInterval запускается только через секунду)
                        
        function updateClock() {
            const t = getTimeRemaining(endtime); // t - объект полученный из фунции

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {     // если дедлайн прошел остановим таймер
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer',deadline);

    //================================= 008-009 Modal Window ===============================

    const modalTrigger = document.querySelectorAll('[data-modal]'), // получили data аттрибут
          modal = document.querySelector('.modal');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // запрет прокрутки страницы
        clearInterval(modalTimerId); // если  пользователь уже открывал окно - повторно не открываем
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        window.removeEventListener('scroll', showModalByScroll); //удаляем скролл на появление фунции
        document.body.style.overflow = ''; // браузер установит значение по умолчанию
    }



    // закрытие модального окна при клике мимо окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '' ) {
            closeModal();
        }
    });

    // закрытие модального окна при нажатии клавиши "Escape"
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000); // через 50 секунд вызывать модальное окно

    function showModalByScroll(){
 //                                        -1 px это микро bug может событие может не сработать в некоторых браузерах
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);

    //================================ 013_product_carts Карточки продуктов ==============================================

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // это массив
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс валют для примера статическое число
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {

            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
        this.parent.append(element);
        }
    }

    new MenuCard (
        "advanced_js/004_send_on_server/img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard (
        "advanced_js/004_send_on_server/img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard (
        "advanced_js/004_send_on_server/img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container'     
    ).render();

    // отправка форм ajax

   
    // отправка формы через аттрибуты модели @ModellAttribute
    /*
       const forms = document.querySelectorAll('form');


        forms.forEach(item => {
            postData(item);
        });

        const message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();


                const statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;
                form.append(statusMessage);

                const request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/request');

                // при использовании new FormData(form) заголовок использовать не нужно
                const formData = new FormData(form); 
                request.send(formData);

                // обработка ответа с сервера
                request.addEventListener('load', () =>{
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMessage.textContent = message.success;
                        form.reset(); // очистить все поля формы

                        setTimeout(() => {  //удалять надпись о успешной отправке через 2 секунды
                            statusMessage.remove();}, 2000);
                    } else {
                        statusMessage.textContent = message.failure;
                    }

                });
            });
        }

*/


 // отправка формы через JSON

       const forms = document.querySelectorAll('form');


        forms.forEach(item => {
            postData(item);
        });

        const message = {
            loading: 'advanced_js/006_notify_user/img/form/spinner.svg', //путь относительно html файла
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };

        function postData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();


                // добавляем картинку загрузки
                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.append(statusMessage);
                form.insertAdjacentElement('afterend', statusMessage); // вставить перед концом элемента

                const request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/request/json');
            
                // при использовании new FormData(form) заголовок использовать не нужно
                const formData = new FormData(form); 
                // нужно добавить в компонент фильтра на backend response.setHeader("Access-Control-Allow-Headers", "Content-Type");
                request.setRequestHeader('Content-Type', 'application/json'); 

                // необходимо FormData конвертировать в json формат
                // для этого FormData конвертируем в объект
                const object = {};
                formData.forEach(function(value, key) {
                    object[key] = value;
                });
                // затем объект конвертируем в JSON
                const jsonFormData = JSON.stringify(object);


                request.send(jsonFormData);

                // обработка ответа с сервера
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        showThanksModal(message.success);
                        form.reset(); // очистить все поля формы
                        statusMessage.remove();
                    } else {
                        showThanksModal(message.failure);
                    }
                });
            });
        }

        function showThanksModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div> 
            </div>
            `;
            document.querySelector('.modal').append(thanksModal);
            setTimeout(()=>{
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal();
            },4000);
        }
});

