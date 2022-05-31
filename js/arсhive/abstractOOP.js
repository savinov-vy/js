"use strict";
const soldier = {
    health: 400,
    armor: 100,
    sayHello: function () {
        console.log("Hello!");
    }
};

// первый способ назначить родительский объект (прототип)

//const jonh = {};
//jonh.__proto__= soldier;          <-- способ depricated


const jonh = Object.create(soldier);  // способ назначить родителя при создании объекта
jonh.sayHello();


const ivan = {
    health: 350
};

Object.setPrototypeOf(ivan, soldier);  // способ динамически назначать родителя
ivan.sayHello();
