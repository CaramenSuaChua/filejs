'use strict';

const submitBtn = document.getElementById("submit-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const sideBar = document.getElementById('sidebar')

////////animation ///////////////
sideBar.addEventListener('click', function(sb) {
    sideBar.classList.toggle('active')
});

const keyBreed = 'breedArray';
let breedArr = JSON.parse(getFromStorage(keyBreed)) ? JSON.parse(getFromStorage(keyBreed)) : [];

let data;

console.log(breedArr)
    /////////khai bao bien VAO ///////////////
const inputData = function() {
    data = {
        Breed: breedInput.value,
        Type: typeInput.value,
    };
};

//////////ham reset////////////////
const reset = function() {
    breedInput.value = '';
    typeInput.value = '';
}

const validateData = function(data) {
    if (data.Breed === "") {
        alert('please fill breed');
        return false
    } else if (data.Type === '') {
        alert('Please fill type');
        return false;
    } else {
        return false;
    }
};

///////function delete///////
const deleteBreed = function() {
    if (confirm('Are you sure ? ')) {
        let id = parseInt(this.parentNode.parentNode.getElementsByTagName('th')[0].textContent) - 1;
        breedArr.splice(id, 1);
        saveToStorage(keyBreed, JSON.stringify(breedArr));
        renderTableData(breedArr);
    }
}

////////hien thi ////////
const renderTableData = function(breedArr) {
    let tableBodyEl = document.getElementById('tbody')
    tableBodyEl.innerHTML = '';
    breedArr.forEach((e, i) => {
        const row = document.createElement('tr')
        row.innerHTML =
            `<th scope = "row" >${i+1}</th> 
        <td >${e.Breed}</td>
        <td >${e.Type}</td>  
        <td><button class= "btn btn-danger"> Delete</button> </td>`;
        tableBodyEl.appendChild(row);

        ////////delete /////////////
        document.querySelectorAll('.btn-danger').
        forEach(del => del.addEventListener('click', deleteBreed))
    });
}

submitBtn.addEventListener('click', function() {
    inputData();
    if (validateData !== 0) {
        breedArr.push(data);

        saveToStorage(keyBreed, JSON.stringify(breedArr));
        reset();
        renderTableData(breedArr);
    } else {
        alert('g')
    }
})

renderTableData(breedArr);