'use strict';

const btnSubmit = document.getElementById('submit-btn');
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const tbodyPet = document.getElementById("tbody");
const btnDelete = document.getElementById('btn-danger');
const btnHealthy = document.getElementById('healthy-btn');
const petManagement = document.querySelector('.navbar-brand');
const caculateBMI = document.getElementById('bmi-btn');

const petArr = [];
let healthyPetArr = [];
let healthyCheck = false;
let data;

btnSubmit.addEventListener('click', function() {
    const data = {
        Id: inputId.value,
        Name: inputName.value,
        Age: parseInt(inputAge.value),
        Type: inputType.value,
        Weight: parseInt(inputWeight.value),
        Length: parseInt(inputLength.value),
        Color: inputColor.value,
        Breed: inputBreed.value,
        Vaccinated: inputVaccinated.checked,
        Dewormed: inputDewormed.checked,
        Sterilized: inputSterilized.checked,
        Date: new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
        BMI: '?',
    };

    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].Id === data.Id) {
            alert('ID must unique!');
            return false;
        };
    }

    const validateData = function() {
        if (data.Id === '') {
            alert('Please fill id ');
        } else if (data.Name === '') {
            alert('Please fill name')
        }
        if (data.Age >= 1 && data.Age <= 15) {} else {
            alert('Age must be between 1 and 15!');
        };
        if (data.Weight >= 1 && data.Weight <= 15) {} else {
            alert('Weight must be between 1 and 15!');
        }
        if (data.Length >= 1 && data.Length <= 100) {} else {
            alert('Length must be between 1 and 100!');
        }
        if (data.Type === "Select Type") {
            alert('Please select Type!');
        }
        if (data.Breed === 'Select Breed') {
            alert('Please select Breed');
        }
        return true;
    };

    const validate = validateData(data);
    if (validate) {
        petArr.push(data);
        clearInput();
        renderTableData(petArr);
    };


});

const healthyPet = function() {
    healthyPetArr = petArr.filter((pet) => pet.Vaccinated &&
        pet.Dewormed && pet.Sterilized);
    console.log(healthyPetArr)
};


function renderTableData(petArr) {
    tbodyPet.innerHTML = '';
    for (let i = 0; i < petArr.length; i++) {
        let vaccinText = petArr[i].Vaccinated ?
            'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
        let taygiunText = petArr[i].Dewormed ?
            'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
        let trietsanText = petArr[i].Sterilized ?
            'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
        const row = document.createElement('tr');
        row.innerHTML = `<tr>
    <th scope="row">${petArr[i].Id}</th>
    <td>${petArr[i].Name}</td>
    <td>${petArr[i].Age}</td>
    <td>${petArr[i].Type}</td>
    <td>${petArr[i].Weight} kg</td>
    <td>${petArr[i].Length} cm</td>
    <td>${petArr[i].Breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].Color}"></i>
    </td>
    <td><i class="${vaccinText}"></i></td>
    <td><i class="${taygiunText}"></i></td>
    <td><i class="${trietsanText}"></i></td>
    <td>${petArr[i].Date}</td>
    <td>${petArr[i].BMI}</td>
    <td><button type="button" class="btn btn-danger">Delete</button>
    </td>
    </tr>
    `;
        tbodyPet.appendChild(row);

        document.querySelectorAll('.btn-danger').forEach(del => del.addEventListener('click', deletePet))
    };

};

const clearInput = () => {
    inputId.value = '';
    inputName.value = '';
    inputAge.value = null;
    inputType.value = 'Select Type';
    inputWeight.value = null;
    inputLength.value = null;
    inputColor.value = '#000000';
    inputBreed.value = 'Select Breed';
    inputVaccinated.checked = false
    inputDewormed.checked = false;
    inputSterilized.checked = false;
}

const deletePet = function() {
    if (confirm('Are you sure?')) {
        let id = this.parentNode.parentNode.getElementsByTagName('th')[0].textContent;
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].Id === id) {
                petArr.splice(i, 1);
            }
        }

        if (!healthyCheck) renderTableData(petArr);
        else renderTableData(healthyCheck)
    }
}

// Hien thi cac thu cung khoe manh ( click vao "Show Healthy Pet se hien thi thu cung khoe manh)
btnHealthy.addEventListener("click", function() {
    console.log(1)
    if (!healthyCheck) {
        healthyCheck = true;
        btnHealthy.textContent = "Show All Pet";
        healthyPet();
        renderTableData(healthyPetArr);
    } else {
        healthyCheck = false;
        btnHealthy.textContent = "Show Healthy Pet";
        renderTableData(petArr);
    }
});
const btnCaculate = function(p) {
    p.forEach(pet => {
        if (pet.Type === 'Dog')
            pet.BMI = ((pet.Weight * 703) / (pet.Length * pet.Length)).toFixed(2);
        else
            pet.BMI = ((pet.Weight * 886) / (pet.Length * pet.Length)).toFixed(2);
    });
    renderTableData(p);
};
caculateBMI.addEventListener('click', () => btnCaculate(petArr));