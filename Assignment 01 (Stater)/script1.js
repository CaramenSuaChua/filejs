"use strict";

// Dat bien
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tBody = document.getElementById("tbody");
const submitBtn = document.getElementById("submit-btn");
// const sidebarTitleEl = document.getElementById("sidebar-title");
// const sidebarEl = document.getElementById("sidebar");
// const storePet = (x) => saveToStorage("pet-list", x);
const petArr = [];

console.log(petArr);


// Tao ham kiem tra du lieu hop le
const validate = function() {
    // Gia tri ID khong duoc trung voi cac thu cung con lai
    for (let i = 0; i < tBody.rows.length; i++) {
        if (idInput.value === tBody.rows[i].cells[0].textContent) return false;
    }
    // Khong co truong nao bi nhap thieu du lieu
    if (!idInput.value) return false;
    if (!nameInput.value) return false;
    if (!ageInput.value) return false;
    if (!weightInput.value) return false;
    if (!lengthInput.value) return false;
    if (!colorInput.value) return false;
    if (typeInput.value === "Select Type" || typeInput.value === "")
        return false;
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        return false;
    if (ageInput.value < 1 || ageInput.value > 15) return false; // 1 <= age <= 15
    if (weightInput.value < 1 || weightInput.value > 15) return false; // 1 <= weight <= 15
    if (lengthInput.value < 1 || lengthInput.value > 100) return false; // 1 <= length <= 100
    return true;
};
// Ham hien thi du lieu
const renderTableData = function(petArr) {
    tBody.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        let vaccinatedText = petArr[i].vaccinated ?
            "bi bi-check-circle-fill" :
            "bi bi-x-circle-fill";
        let dewormedText = petArr[i].dewormed ?
            "bi bi-check-circle-fill" :
            "bi bi-x-circle-fill";
        let sterilizedText = petArr[i].sterilized ?
            "bi bi-check-circle-fill" :
            "bi bi-x-circle-fill";
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].length} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class="${vaccinatedText}"></i></td>
<td><i class="${dewormedText}"></i></td>
<td><i class="${sterilizedText}"></i></td>
<td>${petArr[i].date}</td>
<td>
<td>
    <button type="button" class="btn btn-danger">
    Delete
    </button>
</td>`;
        tBody.appendChild(row);
    }
    // 6. Xoa mot thu cung
    // Ham xoa thu cung
    const deletePet = function(id) {
        for (let i = 0; i < tBody.rows.length; i++) {
            if (id === tBody.rows[i].cells[0].textContent) {
                petArr.splice(i, 1);
                // storePet(petArr);
            }
            renderTableData(petArr);
        }
    };
    // Bat su kien "click" vao nut "Delete"
    const btnsDelete = document.querySelectorAll(".btn-danger");
    for (let j = 0; j < btnsDelete.length; j++) {
        btnsDelete[j].addEventListener("click", function() {
            const confirmDelete = confirm("Are you sure?");
            if (confirmDelete) {
                const id = tBody.rows[j].cells[0].textContent;
                deletePet(id);
            }
        });
    }
}; //---------
renderTableData(petArr);
// Lay breed-list tu Storage
const petBreed = [];
// Ham hien thi breed
const renderBreed = function(petBreed) {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < petBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${petBreed[i].breed}</option>`;
        breedInput.appendChild(option);
    }
};
// Loc breed theo loai ma nguoi dung dang chon
typeInput.addEventListener("change", function() {
    const optionsValue = petBreed.filter(function(item) {
        if (typeInput.value === "Dog") return item.type === "Dog";
        if (typeInput.value === "Cat") return item.type === "Cat";
        if (typeInput.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});
// 1. Bat su kien "click" vao nut "Submit"
// 2. Lay duoc du lieu tu input form
submitBtn.addEventListener("click", function() {
    const data = {
        id: idInput.value,
        name: nameInput.value,
        age: parseInt(ageInput.value),
        type: typeInput.value,
        weight: parseInt(weightInput.value),
        length: parseInt(lengthInput.value),
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: new Date().getDate() +
            "/" +
            (new Date().getMonth() + 1) +
            "/" +
            new Date().getFullYear(),
    };
    // 3. Kiem tra du lieu da hop le chua
    // 3.1. Thong bao den nguoi dung neu du lieu khong hop le
    // Gia tri ID khong duoc trung voi cac thu cung con lai
    for (let i = 0; i < tBody.rows.length; i++) {
        if (idInput.value === tBody.rows[i].cells[0].textContent)
            alert("Please enter a unique ID");
    }
    // Khong co truong nao bi nhap thieu du lieu
    if (!idInput.value) alert("Please input ID");
    if (!nameInput.value) alert("Please input name");
    if (!ageInput.value) alert("Please input age");
    if (typeInput.value === "Select Type" || typeInput.value === "")
        alert("Please select type");
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        alert("Please select breed");
    if (!weightInput.value) alert("Please input weigth");
    if (!lengthInput.value) alert("Please input length");
    if (!colorInput.value) alert("Please input color");

    if (ageInput.value < 1 || ageInput.value > 15)
        alert("Age must be between 1 and 15!"); // 1 <= age <= 15
    if (weightInput.value < 1 || weightInput.value > 15)
        alert("Weight must be between 1 and 15!"); // 1 <= weight <= 15
    if (lengthInput.value < 1 || lengthInput.value > 100)
        alert("Length must be between 1 and 100!"); // 1 <= length <= 100
    // 3.2. Kiem tra du lieu hop le bang cach goi ham validate
    validate();
    // 4. Neu du lieu hop le thi them du lieu vao mang va hien thi du lieu ra giao dien nguoi dung
    if (validate()) {
        // Them du lieu vao mang
        petArr.push(data);
        console.log(petArr);
        // Hien thi du lieu
        renderTableData(petArr);
        // storePet(petArr);
        // 5. Xoa cac du lieu vua nhap tren form
        idInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        typeInput.value = "";
        weightInput.value = "";
        lengthInput.value = "";
        breedInput.value = "";
        vaccinatedInput.checked = false;
        dewormedInput.checked = false;
        sterilizedInput.checked = false;
        tBody.value = "";
    }
});
// 7. Hien thi cac thu cung khoe manh
// Chon thu cung khoe manh
let healthyPetArr = [];
const btnHealthyPet = document.getElementById("healthy-btn");
const healthyPet = function() {
    for (let i = 0; i < petArr.length; i++) {
        if (
            petArr[i].vaccinated === true &&
            petArr[i].dewormed === true &&
            petArr[i].sterilized === true
        ) {
            healthyPetArr.push(petArr[i]);
        }
        renderTableData(healthyPetArr);
    }
};
// Hien thi cac thu cung khoe manh ( click vao "Show Healthy Pet se hien thi thu cung khoe manh)
btnHealthyPet.addEventListener("click", function() {
    if (btnHealthyPet.textContent === "Show All Pet") {
        renderTableData(petArr);
        btnHealthyPet.textContent = "Show Healthy Pet";
    } else {
        healthyPetArr = [];
        healthyPet();
        btnHealthyPet.textContent = "Show All Pet";
    }
});