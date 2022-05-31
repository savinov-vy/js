"use strict";

const options = {
    fieldName: 'test',
    width: 1024,
    height: 1024,
    colors: {
        borders: 'black',
        bg: 'red'
    },
    makeTest: function() {
        console.log('Hello test');
    }
};
//==================
// Методы в объекте
options.makeTest();

//===================
// Деструктуризация объекта

const {borders, bg} = options.colors;
console.log(borders);




// console.log(options.name);

// console.log(options['name']);

// delete options.name;

// console.log(options);


// for in ====================

let counter = 0;

for (let key in options) {
    if (typeof (options[key]) === 'object') {
        for (let i in options[key]) {
            console.log(`свойство вложенного объекта ${i} имеет значение ${options[key][i]}`);
            counter++;
        }
    } else {

        console.log(`свойство объекта ${key} имеет значение ${options[key]}`);

        counter++;
    }
}

console.log(counter);

// метод получение ключей из объекта и их количества

console.log(Object.keys(options));
console.log(Object.keys(options).length);
