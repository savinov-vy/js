"use strict";

const numbers = {
    a: 5,
    b: 10,
    c: {
        x: 7,
        y: 4
    }
};

const newNumbers = copy(numbers);

newNumbers.a = 10;

console.log(newNumbers);
console.log(numbers);

//поверхностная копирование объекта
// внутренний объект по прежнему копируется по ссылке
function copy(mainObj) {
    let objCopy = {};
    let key;
    for (key in mainObj) {
        objCopy[key] = mainObj[key];
    }
    return objCopy;
}
//===========================
// поверхностная копия через соединение объектов
const add = {
    d: 17,
    e: 20
};

const numbers2 = {
    a: 5,
    b: 10,
    c: {
        x: 7,
        y: 4
    }
};
 
// соедениние объектов
console.log(Object.assign(numbers2, add));

// поверхностный клон через assign
const clone = Object.assign({}, add);
console.log(clone);

//===== поверхностная копия массива

const oldArray = [1, 2, 3, 4];

const newArray = oldArray.slice();


//=================================
// использовать spred оператор (оператор разворачивает содержимое массивов и объектов)

const video = ['youtube', 'vimeo', 'rutube'],
      blogs = ['wordpress', 'livejournal', 'blogger'],
      internet = [...video, ...blogs, 'vk', 'ya']; 

      console.log(internet);

// поверхностная копия массива с помощью спред оператора

const array = ['a', 'b'];

const newArr = [...array];

// поверхностная копия объекта с помощью спред опаратора

const q = {
    one: 1,
    two: 2
};

const newObj = {...q};
