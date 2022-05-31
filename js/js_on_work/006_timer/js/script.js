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
});
