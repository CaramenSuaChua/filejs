'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images')

///////////////////////////////////////
//////ham doi //////////////
const wait = function (seconds){
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}     
//////////ham hien thi anh//////////
const createImage = function ( imgPath){
    return new Promise (function (resolve, reject) { 
        
        const img = document.createElement('img');
        img.src = imgPath;
    
        img.addEventListener('load', function(){
            imgContainer.append(img)
            resolve(img )
        }) 
    
        img.addEventListener('load', function(){
            reject (new Error ('Image not found'));
        })
    });
};

let currenImg ;
createImage('image/img-1.jpg')
.then(img =>{ 
    currenImg = img;
    console.log('img 1 : ' );
    return wait(2);
})
.then(() => {
    currenImg.style.display ='none' ; 
    return createImage('image/img-2.jpg')
})
.then( img => {
    currenImg = img;
    console.log('img 2 :');
    return wait(2);
})
.then( () => {
    currenImg.style.display='none';
    return createImage('image/img-3.jpg')
})
.then( img => {
    currenImg = img;
    console.log('img 3 :')
    return wait(2);
})
.then ( () => currenImg.style.display='none')
.catch(err => console.error(`${err.message}`));

