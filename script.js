function submitStep1() {
    let nama = document.getElementById("nama").value;
    let jumlah = document.getElementById("jumlah").value;
    
    if (nama === "" || jumlah <= 0) {
        alert("Nama tidak boleh kosong dan jumlah harus lebih dari 0!");
        return;
    }

    let formStep2 = document.getElementById("form-step-2");
    formStep2.innerHTML = `<h3>Masukkan ${jumlah} Pilihan</h3>`;

    for (let i = 1; i <= jumlah; i++) {
        formStep2.innerHTML += `
            <label for="pilihan${i}">Pilihan ${i}:</label>
            <input type="text" id="pilihan${i}" required><br>
        `;
    }

    formStep2.innerHTML += `<button onclick="submitStep2(${jumlah})">OK</button>`;
    formStep2.style.display = "block";
}

function submitStep2(jumlah) {
    let pilihan = [];

    for (let i = 1; i <= jumlah; i++) {
        let value = document.getElementById(`pilihan${i}`).value;
        if (value === "") {
            alert("Semua pilihan harus diisi!");
            return;
        }
        pilihan.push(value);
    }

    let formStep3 = document.getElementById("form-step-3");
    formStep3.innerHTML = `<h3>Pilih Salah Satu</h3>`;

    for (let i = 0; i < pilihan.length; i++) {
        formStep3.innerHTML += `
            <input type="radio" name="selectedOption" value="${pilihan[i]}">
            <label>${pilihan[i]}</label><br>
        `;
    }

    formStep3.innerHTML += `<button onclick="submitStep3('${pilihan}')">OK</button>`;
    formStep3.style.display = "block";
}

function submitStep3(pilihanString) {
    let pilihanArray = pilihanString.split(",");
    let selectedOption = document.querySelector('input[name="selectedOption"]:checked');

    if (!selectedOption) {
        alert("Pilih salah satu opsi!");
        return;
    }

    let nama = document.getElementById("nama").value;
    let jumlah = document.getElementById("jumlah").value;
    let hasilDiv = document.getElementById("hasil");

    hasilDiv.innerHTML = `<h3>Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan yaitu ${pilihanArray.join(", ")}, dan saya memilih ${selectedOption.value}.</h3>`;
    hasilDiv.style.display = "block";
}
