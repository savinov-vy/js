const log = function(a, b, ...rest) {
    console.log(a, b, rest);
};

log('basic', 'rest', 'operator', 'usage');

// обратный оператор от spread оператора

function calcOrDouble(number, basic = 2) { // 2 - дефолтное значение 
    console.log(number * basic);
}

calcOrDouble(3);