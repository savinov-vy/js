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

        const postData = async (url, data) => { 
            const res = await fetch (url, { 
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            return res; 
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

                form.insertAdjacentElement('afterend', statusMessage); 

                const formData = new FormData(form); 

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


// Slider - карусель - добавлены точки

const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'), 
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width; //computed style 
    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'; 
    slidesField.style.transition = '0.5s all'; 

    slidesWrapper.style.overflow = 'hidden'; 

    slides.forEach(slide => {
        slide.style.width = width; 
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;     
    `;

    slider.append(indicators);

    // нужно создать столько точек сколько есть слайдов
    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `    
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i==0) { //инициализация первой точки (1го слайдера)
            dot.style.opacity = 1;
        }
        indicators.append(dot); //поместили точку на страницу
        dots.push(dot); // дополнительно поместили точку в массив
    } 

    
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    next.addEventListener('click', () => {
 
        if(offset == width.slice(0, width.length - 2) * (slides.length - 1)) { 
            // если слайд последний
            offset = 0;
        } else {
            // если слайд не последний
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;


        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        //каждую точку тушим на 50%
        dots.forEach(dot => dot.style.opacity = '.5');
        // точку с активным слайдом зажигаем на  100%
        dots[slideIndex - 1].style.opacity = 1;
    });

    // движение назад
    prev.addEventListener('click', () => {
    if(offset == 0) { 
        // если слайд первый
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        // если слайд не первый
        offset -= +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;


    if(slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
    });

// обработка нажатия на точки
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
});
