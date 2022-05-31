'use strict';
// классы в js это синтаксический сахар - красивая обёртка функций-конструкторов
class Rectangle {
    constructor(high, width) {
        this.high = high;
        this.width = width;
    }

    calcArea() {
        return this.high * this.width;
    }
}

const square = new Rectangle(10, 10);
const long = new Rectangle(10, 200);

console.log(square.calcArea());
console.log(long.calcArea());


class ColoredReactangleWithText extends Rectangle {
    constructor(high, width, text, bgColor) {
        super(high, width);
        this.text = text;
        this.bgColor = bgColor;
    }

    showMyProps(){
        console.log(`Текст:  ${this.text}, цвет: ${this.bgColor}`);
    }
}

const div = new ColoredReactangleWithText(25, 10, 'Hello World', 'red');
div.showMyProps();
console.log(div.calcArea());

