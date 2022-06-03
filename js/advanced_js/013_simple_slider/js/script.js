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
              hours = Math.floor((t /(1000 * 60 * 60) % 24)),    // остаток от деления чтобы убрать излишки периодов
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

    const getResouce = async (url) => {
        const res = await fetch (url);

        if(!res.ok) { // если не код 200
            throw new Error (`Could not feth ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getResouce('http://localhost:8080/menu')
            .then(data => {
                data.forEach(({img, altimg, title, descr, price}) => {  // object деструктруризировали по частям
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                });
            });

 // отправка формы через JSON

       const forms = document.querySelectorAll('form');

       const message = {
        loading: 'advanced_js/006_notify_user/img/form/spinner.svg', //путь относительно html файла
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };


        forms.forEach(item => {
            bindPostData(item);
        });

        const postData = async (url, data) => { // async там где начинается асинхронный код
            const res = await fetch (url, { //код выполняется асинхронно!!! это важно!! РЕШЕНИЕ - await ждёт ответа
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            return res; // если нужно перевести объект json() то тут тоже await
        };


        function bindPostData(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();


                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                //form.append(statusMessage);
                form.insertAdjacentElement('afterend', statusMessage); // вставить перед концом элемента

                const formData = new FormData(form); 

                // необходимо FormData конвертировать в json формат
                // для этого FormData конвертируем в объект
                // способ 1
             /*  const object = {};
                formData.forEach(function(value, key) {
                    object[key] = value;
                }); */  

                // способ 2
                // entries - превратить в массив массивов
                // fromEntries превратить в объект
                // fromEntries - привратить объект в JSON
                console.log(Object.fromEntries(formData.entries()));
                const json = JSON.stringify(Object.fromEntries(formData.entries()));


                postData('http://localhost:8080/request/json', json)
                .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
                }).catch(() => {
                    console.log('asdf');
                showThanksModal(message.failure);
                }).finally(() => {
                form.reset();
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



//========================= 013_simple_slider ========================================

// Slider

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;

    showSlides();

    showSlides(slideIndex);

    // какой слайд по счёту из ....
    // добавить 0 если всего слайдов будет меньше 10
    // или если число больше 10 то просто установить максимальное количество
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1; // если перелистываем дальше последнего слайда то начинаем с первого (по кругу)
        }

        if (n < 1) {
            slideIndex = slides.length; // раньше первого слайда последний (по кругу)
        }

        slides.forEach(item => item.style.display = 'none'); // скрываем все слайды

        slides[slideIndex - 1].style.display = 'block'; // показываем только первый слайд


        // какой слайд по счёту 
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    // обработчики на стрелки
    prev.addEventListener('click', () => plusSlides(-1));

    next.addEventListener('click', () => plusSlides(1));


});