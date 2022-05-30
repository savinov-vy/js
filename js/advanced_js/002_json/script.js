'use strict';

const persone = {
    name: 'Alex',
    tel: '+74444',
    parents: {
        mom: 'Olga',
        dad: 'Mike'
    }
};


console.log(JSON.stringify(persone));  // to JSON формат

console.log(JSON.parse(JSON.stringify(persone))); // to object формат


const clone = JSON.parse(JSON.stringify(persone)); // clone - глубокая копия объекта