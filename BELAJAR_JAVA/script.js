class Pendaftar {
    _errorMessage = ''

    constructor(nama, umur, uangSaku) {
        this._validatePayload(nama, umur, uangSaku)

        this.nama = nama
        this.umur = umur
        this.uangSaku = uangSaku
    }

    _validatePayload(nama, umur, uangSaku) {
        if(nama.length < 10) {
            this._errorMessage = "Nama kurang dari 10 karakter"
            return
        }

        if(umur < 25) {
            this._errorMessage = "Umur kurang dari 25 tahun"
            return
        }

        if(uangSaku < 100000 || uangSaku > 1000000) {
            this._errorMessage = "Uang saku tidak boleh kurang dari 100 ribu dan lebih dari 1 juta"
            return
        }
    }
}

const form = document.getElementById("form-registrasi")
const warning = document.getElementById("warning")
const average = document.getElementById("average")
const error = document.getElementById("error")
const table = document.getElementById("table")
const body = document.querySelector("body")
const listPendaftar = []

function register() {
    let nama = form.nama.value
    let umur = form.umur.value
    let uangSaku = form.uangSaku.value

    const newPendaftar = new Pendaftar(nama, umur, uangSaku)

    if(newPendaftar._errorMessage.length) {
        error.innerHTML = newPendaftar._errorMessage

        form.reset()
    } else {
        warning.innerHTML = ""
        error.innerHTML = ""
        table.style.display = "block"
        // warning.style.display = "hide"

        listPendaftar.push(newPendaftar)
        form.reset()

        const row = document.createElement("tr")
        const nama = document.createElement("td")
        const umur = document.createElement("td")
        const uangSaku = document.createElement("td")

        nama.innerHTML = newPendaftar.nama
        umur.innerHTML = newPendaftar.umur
        uangSaku.innerHTML = newPendaftar.uangSaku

        row.append(nama, umur, uangSaku)

        table.appendChild(row)

        const totalUangSaku = listPendaftar.reduce((acc, value) => acc + Number(value.uangSaku), 0)
        const totalUmur = listPendaftar.reduce((acc, value) => acc + Number(value.umur), 0)

        console.log("totalUangSaku: ", totalUangSaku)
        console.log("totalUmur: ", totalUmur)

        average.innerHTML = `Rata rata Uang Saku: ${(totalUangSaku / listPendaftar.length).toLocaleString("kr-KO")}
            <br>
            Rata rata Umur: ${totalUmur / listPendaftar.length}
        `
    }
}

if(!listPendaftar.length) {
    // warning.style.display = "block"
    // table.style.display = "hide"

    warning.innerHTML = "Data Kosong"
}else {
    warning.innerHTML = ""

    table.style.display = "block"
    // warning.style.display = "hide"

    for(const i in listPendaftar) {
        const row = document.createElement("tr")
        const nama = document.createElement("td")
        const umur = document.createElement("td")
        const uangSaku = document.createElement("td")

        nama.innerHTML = listPendaftar[i].nama
        umur.innerHTML = listPendaftar[i].umur
        uangSaku.innerHTML = listPendaftar[i].uangSaku

        row.append(nama, umur, uangSaku)

        table.appendChild(row)
    }
}










