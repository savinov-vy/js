
const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();


    // 3 метода необходимые для запроса на сервер
    // open - собирает настройки для осуществления запроса (не открывает канал между бэком и фронтом)
    // url формируется относительно html файла
    request.open('GET', 'advanced_js/003_ajax/host/current.json');      //request.open(method, url, async, login, password);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // headers необходимые для передачи json 
    request.send(); // метод send может принимать body request.send(body);

    request.addEventListener('readystatechange', () => { // событие следит за изменением статуса запроса readyState
        if (request.status === 200) {
            console.log(request.response);
            const data = JSON.parse(request.response);
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // toFixed(2) - количество символов после запятой
        } else {
            inputUsd.value = "Что-то пошло не так";
        }
    }); 


    // свойства ответа от запроса на сервер

    // status - коды ответа например 200 или 500 404 403 и т.д.
    // statusText - описание ответа от сервера приписывается к коду ответа (Расшифровка кода ответа)
    // response - ответ который задал бекенд разработчик, который необходимо использовать на клиенте
    // readyState - текущее состояние запроса (обозначается либо цифрой либо словами. Цифры от 0 до 4 (5шт.))

    // виды состояний readyState:
    /*
    значение    состояние               описание
    0     -      UNSERT                 Объект был создан. Метод open() ещё не вызывался
    1     -      OPENED                 Метод open() был вызван
    2     -      HEADERS_RECEIVED       Метод send() был вызван, доступны заголовки headers и статус
    3     -      LOADING                Загрузка; responseText содержит частичные данные
    4     -      DONE                   Операция полностью завершена
    */

    // события запроса

    // readystatechange
    // 

});