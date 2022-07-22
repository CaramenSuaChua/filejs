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
// //////////ham hien thi anh//////////
const createImage = function ( imgPath){
    return new Promise (function (resolve, reject) { 
        
        const img = document.createElement('img');
        img.src = imgPath;
    
        img.addEventListener('load', function(){
            imgContainer.append(img)
            resolve(img )
        }) 
    
        img.addEventListener('error', function(){
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

// const loadNPause = async function(){
//     try{
//         let img = await createImage('image/img-1.jpg');
//         console.log(' Image 1 :');
//         await wait(2);
//         img.style.display= 'none';

//         img = await createImage('image/img-2.jpg')
//         console.log(' Image 2 :');
//         await wait(2);
//         img.style.display= 'none';

//         img = await createImage('image/img-3.jpg')
//         console.log(' Image 3 :');
//         await wait(2);
//         img.style.display= 'none';

//     } catch (err){
//         console.error(err)
//     }
// }
// loadNPause()


const loadAll = async function(imgArr){
    try{
        const imgs = imgArr.map(async img => await createImage(img));
        console.log(imgs)

        const imgsEL = await Promise.all (imgs)
        console.log(imgsEL);
        imgsEL.forEach(img => {
            img.classList.add('parallel')
        });
    } catch (err){
        console.error(err)
    }
}
loadAll(['image/img-1.jpg', 'image/img-2.jpg', 'image/img-3.jpg']);