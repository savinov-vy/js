'use strict';
/*
// промисы это обещания они либо выполняются либо не выполняются
// нужны для того чтобы избавится от цепочек callback функций
// resolve - чтото выполнилось
// reject - чтото не выполнилось

const req = new Promise(function (resolve, reject) {

    setTimeout(() => {
        console.log('Подготовка данных...');
    
        const product = {
            name: 'TV',
            price: 2000
        };
        resolve(product);   // если эта фунция выполнится тогда выполнится then();
    }, 2000);
});

req.then((product) => {
    setTimeout(()=>{
        product.status = 'order';
        console.log(product);
    }, 2000);
});


req.then((product) => {
    const req2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    });

    req2.then(data => {
       console.log(data); 
    });
});
*/
// можно изменить ситаксис и тогда кода будет меньше
// then можно выполнять попорядку resolve
/* пример срабатывание resolve()
const req = new Promise(function (resolve, reject) {

    setTimeout(() => {
        console.log('Подготовка данных...');
    
        const product = {
            name: 'TV',
            price: 2000
        };
        resolve(product);   // если эта фунция выполнится тогда выполнится then();
    }, 2000);
});

req.then((product) => {
    setTimeout(()=>{
        product.status = 'order';
        console.log(product);
    }, 2000);
});


req.then(product => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            resolve(product);
        }, 2000);
    }).then(data => {
        data.modify = true;
        return data; 
     }).then((data) => {
         console.log(data);
     });
});

*/

/*
// пример срабатывания reject();
const req = new Promise(function (resolve, reject) {

    setTimeout(() => {
        console.log('Подготовка данных...');
    
        const product = {
            name: 'TV',
            price: 2000
        };
        resolve(product);   // если эта фунция выполнится тогда выполнится then();
    }, 2000);
});

req.then((product) => {
    setTimeout(()=>{
        product.status = 'order';
        console.log(product);
    }, 2000);
});


req.then((product) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            product.status = 'order';
            reject();  // после срабатывания reject() срабатывает catch()
            console.log('Этот блок выполнился');
        }, 2000);
    }).then(data => {
        data.modify = true;
        console.log('Этот блок не выполнился2');
        return data; 
     }).then(data => {
         console.log(data);
         console.log('Этот блок не выполнился3');
     }).catch(()=>{
         console.error('Произошла ошибка');
     });
    });
    */

    // пример срабfinally

    const req = new Promise(function (resolve, reject) {

        setTimeout(() => {
            console.log('Подготовка данных...');
        
            const product = {
                name: 'TV',
                price: 2000
            };
            resolve(product);   // если эта фунция выполнится тогда выполнится then();
        }, 2000);
    });
    
    req.then((product) => {
        setTimeout(()=>{
            product.status = 'order';
            console.log(product);
        }, 2000);
    });
    
    
    req.then((product) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                product.status = 'order';
                resolve(product);
                console.log('Этот блок выполнился1');
            }, 2000);
        }).then(data => {
            data.modify = true;
            console.log('Этот блок выполнился2');
            return data; 
         }).then(data => {
             console.log(data);
             console.log('Этот блок выполнился3');
             return data;
         }).then(()=>{
             console.log('Произошла ошибка4');
         });
        });
    