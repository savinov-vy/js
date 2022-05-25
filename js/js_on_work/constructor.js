'use strict';

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function() {
        console.log(`Hello ${this.name}`);
    };
}

const ivan = new User('Ivan', 28);


ivan.hello();

console.log(ivan);


// добавить метод exit к объекту
// метод появится у всех объектов созданных после добавления этого метода
User.prototype.exit = function() {
    console.log(`Пользователь ${this.name} ушел`);
};

const alex = new User('Alex', 20);
alex.hello();
alex.exit();
console.log(alex); //выполняется, но в распечатанном виде метода не видно
