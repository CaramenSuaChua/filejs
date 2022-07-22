'use strict';

const sideBarbtn = document.getElementById('sidebar');
const btnImport = document.getElementById('import-btn');
const btnExport = document.getElementById('export-btn');


////////////////animation/////////
sideBarbtn.addEventListener('click', function(sb){
  sideBarbtn.classList.toggle('active');
});

// Chuyển dữ liệu trong storage từ string thành array
const KEY_PETS = 'petArray';
let petArr = JSON.parse(getFromStorage(KEY_PETS)) ?? [];

// Nut Export tải dữ liệu về máy tính
let pet = JSON.stringify(petArr);    
const saveStaticDataToFile = function(){
  const blob = new Blob([pet],{ type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'DataPet.txt');
}
/////nhan expot de tai file ve///////
btnExport.addEventListener('click', saveStaticDataToFile);

//////import tai lieu///////////
async function readText(event) {
  const file = event.target.files.item(0)
   petArr = await file.text();
  
  document.getElementById("output").innerText = petArr;
  
  btnImport.addEventListener('click', (e) => {
    let petArr = JSON.parse(getFromStorage(KEY_PETS));
    renderTableData(petArr);
  });
  saveToStorage(KEY_PETS, petArr);
}

// }
// Tạo table hiển thị thú cưng khi người dùng chọn file rồi import
function renderTableData(petArr){
  
  let tableBodyEl = document.getElementById('tbody');
  tableBodyEl.innerHTML = '';

 petArr.forEach((element) => {
    const row = document.createElement('tr');  
    row.innerHTML = `
    <th scope="row">${element.id}</th>
    <td>${element.name}</td>
    <td>${element.age}</td>
    <td>${element.type}</td>
    <td>${element.weight} kg</td>
    <td>${element.length} cm</td>
    <td>${element.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${element.color}"></i>
    </td>
    <td><i class="bi ${
      element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${(new Date(element.date)).toLocaleDateString("en-US")}</td>
    `;

    tableBodyEl.appendChild(row);
  });
};

