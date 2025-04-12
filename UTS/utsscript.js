function submitStep1() {
    const namaDepan = document.getElementById("namaDepan").value.trim();
    const namaBelakang = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (!namaDepan || !namaBelakang || !email || isNaN(jumlah) || jumlah <= 0) {
        alert("Semua kolom harus diisi dengan benar!");
        return;
    }

    // Disable input & button step 1
    document.getElementById("namaDepan").disabled = true;
    document.getElementById("namaBelakang").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("jumlah").disabled = true;

    const formStep2 = document.getElementById("form-step-2");
    formStep2.innerHTML = `<h5 class="mb-3">Masukkan ${jumlah} Pilihan Hobi:</h5>`;

    for (let i = 1; i <= jumlah; i++) {
        formStep2.innerHTML += `
            <div class="mb-2">
                <label for="pilihan${i}" class="form-label">Pilihan ${i}:</label>
                <input type="text" id="pilihan${i}" class="form-control" required>
            </div>
        `;
    }

    formStep2.innerHTML += `<button class="btn btn-primary mt-2" onclick="submitStep2(${jumlah})">Oke</button>`;
    formStep2.style.display = "block";
}

function submitStep2(jumlah) {
    let pilihan = [];

    for (let i = 1; i <= jumlah; i++) {
        const input = document.getElementById(`pilihan${i}`);
        const value = input.value.trim();
        if (value === "") {
            alert("Semua pilihan hobi harus diisi!");
            return;
        }
        pilihan.push(value);
        input.disabled = true;
    }

    const formStep3 = document.getElementById("form-step-3");
    formStep3.innerHTML = `<h5 class="mb-3">Pilih Hobi yang Anda Sukai:</h5>`;

    pilihan.forEach((item, index) => {
        formStep3.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${item}" id="hobi${index}">
                <label class="form-check-label" for="hobi${index}">
                    ${item}
                </label>
            </div>
        `;
    });

    formStep3.innerHTML += `<button class="btn btn-success mt-3" onclick='submitStep3(${JSON.stringify(pilihan)})'>Oke</button>`;
    formStep3.style.display = "block";
}

function submitStep3(pilihanArray) {
    const selected = pilihanArray.filter((item, index) => {
        return document.getElementById(`hobi${index}`).checked;
    });

    if (selected.length === 0) {
        alert("Silakan pilih minimal satu hobi yang Anda sukai.");
        return;
    }

    const namaDepan = document.getElementById("namaDepan").value.trim();
    const namaBelakang = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();
    const jumlah = document.getElementById("jumlah").value;

    const hasilDiv = document.getElementById("hasil");
    hasilDiv.innerHTML = `
        <div class="alert alert-info">
            Halo, nama saya <strong>${namaDepan} ${namaBelakang}</strong>, dengan email <strong>${email}</strong>. <br>
            Saya mempunyai sejumlah <strong>${jumlah}</strong> pilihan hobi yaitu: <em>${pilihanArray.join(", ")}</em>, 
            dan saya menyukai <strong>${selected.join(", ")}</strong>.
        </div>
    `;
    hasilDiv.style.display = "block";

    // Optional: Disable further input
    document.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
}

