function submitStep1() {
    let nama = document.getElementById("nama").value;
    let jumlah = parseInt(document.getElementById("jumlah").value);
    
    if (nama === "" || isNaN(jumlah) || jumlah <= 0) {
        alert("Nama tidak boleh kosong dan jumlah harus lebih dari 0!");
        return;
    }

    document.getElementById("nama").disabled = true;
    document.getElementById("jumlah").disabled = true;
    document.getElementById("submitStep1").style.display = "none";
    
    let formStep2 = document.getElementById("form-step-2");
    formStep2.innerHTML = `<h3>Masukkan ${jumlah} Pilihan</h3>`;

    for (let i = 1; i <= jumlah; i++) {
        formStep2.innerHTML += `
            <label for="pilihan${i}">Pilihan ${i}:</label>
            <input type="text" id="pilihan${i}" required><br>
        `;
    }

    formStep2.innerHTML += `<button id="submitStep2Btn" onclick="submitStep2(${jumlah})">OK</button>`;
    formStep2.style.display = "block";
}

function submitStep2(jumlah) {
    let pilihan = [];

    for (let i = 1; i <= jumlah; i++) {
        let input = document.getElementById(`pilihan${i}`);
        let value = input.value.trim();
        if (value === "") {
            alert("Semua pilihan harus diisi!");
            return;
        }
        pilihan.push(value);
        input.disabled = true;
    }

    document.getElementById("submitStep2Btn").style.display = "none";
    
    let formStep3 = document.getElementById("form-step-3");
    formStep3.innerHTML = `<h3>Pilih Salah Satu</h3>`;

    let select = document.createElement("select");
    select.id = "dropdownPilihan";

    let defaultOption = document.createElement("option");
    defaultOption.textContent = "-- Pilih Salah Satu --";
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    pilihan.forEach(pilihanItem => {
        let option = document.createElement("option");
        option.value = pilihanItem;
        option.textContent = pilihanItem;
        select.appendChild(option);
    });
    
    formStep3.appendChild(select);
    
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.onclick = () => submitStep3(pilihan);
    formStep3.appendChild(submitBtn);
    
    formStep3.style.display = "block";
}

function submitStep3(pilihanArray) {
    let selectedOption = document.getElementById("dropdownPilihan").value;
    
    if (!selectedOption) {
        alert("Pilih salah satu opsi!");
        return;
    }

    let nama = document.getElementById("nama").value;
    let jumlah = document.getElementById("jumlah").value;
    let hasilDiv = document.getElementById("hasil");
    
    hasilDiv.innerHTML = `<h3>Hallo, nama saya ${nama}, saya mempunyai sejumlah ${jumlah} pilihan yaitu ${pilihanArray.join(", ")}, dan saya memilih ${selectedOption}.</h3>`;
    hasilDiv.style.display = "block";
    
    document.querySelectorAll("button").forEach(btn => btn.style.display = "none");
    document.querySelectorAll("input, select").forEach(input => input.disabled = true);
}