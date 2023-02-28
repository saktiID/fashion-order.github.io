$(document).ready(function () {

    let kab = $('#kabupaten')
    let kec = $('#kecamatan')
    let kel = $('#kelurahan')
    let provinsi = document.getElementById('provinsi')
    let kabupaten = document.getElementById('kabupaten')
    let kelurahan = document.getElementById('kelurahan')
    let pesan = document.getElementById('pesan')

    // fecth data provinsi
    $.ajax({
        url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/provinces.json',
        success: function (res) {
            let resArray = JSON.parse(res)
            for (let i = 0; i < resArray.length; i++) {
                getProv(resArray, i)
            }

        }
    })

    // get prov list
    let getProv = (arr, i) => {
        var opt = document.createElement('option')
        opt.value = arr[i].id
        opt.innerHTML = arr[i].name
        opt.dataset.name = arr[i].name
        provinsi.appendChild(opt)
    }

    // add event listener provinsi changed
    provinsi.addEventListener('change', () => {
        console.log('provinsi changed')

        // check old option
        if (kabupaten.options.length > 0) {
            // remove old option
            kab.empty()
        }

        if (kecamatan.options.length > 0) {
            // remove old option
            kec.empty()
        }

        if (kelurahan.options.length > 0) {
            // remove old option
            kel.empty()
        }



        // fetch data kabupaten
        $.ajax({
            url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/regencies/' + provinsi.value + '.json',
            success: function (res) {
                let resArray = JSON.parse(res)
                for (let i = 0; i < resArray.length; i++) {
                    getKab(resArray, i)
                }
            }
        })
    })

    // get kab list
    let getKab = (arr, i) => {
        var opt = document.createElement('option')
        opt.value = arr[i].id
        opt.innerHTML = arr[i].name
        opt.dataset.name = arr[i].name
        kabupaten.appendChild(opt)
    }

    // add event listener kabupaten changed
    kabupaten.addEventListener('change', () => {
        console.log('kabupaten changed')

        // check old option
        if (kecamatan.options.length > 0) {
            // remove old option
            kec.empty()
        }

        if (kelurahan.options.length > 0) {
            // remove old option
            kel.empty()
        }

        // fetch data kecamatan
        $.ajax({
            url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/districts/' + kabupaten.value + '.json',
            success: function (res) {
                let resArray = JSON.parse(res)
                for (let i = 0; i < resArray.length; i++) {
                    getKec(resArray, i)
                }
            }
        })
    })

    // get kec list
    let getKec = (arr, i) => {
        var opt = document.createElement('option')
        opt.value = arr[i].id
        opt.innerHTML = arr[i].name
        opt.dataset.name = arr[i].name
        kecamatan.appendChild(opt)
    }

    // add event listener kecamatan changed
    kecamatan.addEventListener('change', () => {
        console.log('kecamatan changed')

        // check old option
        if (kelurahan.options.length > 0) {
            // remove old option
            kel.empty()
        }

        // fetch data kelurahan
        $.ajax({
            url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/villages/' + kecamatan.value + '.json',
            success: function (res) {
                let resArray = JSON.parse(res)
                for (let i = 0; i < resArray.length; i++) {
                    getKel(resArray, i)
                }
            }
        })
    })

    // get kel list
    let getKel = (arr, i) => {
        var opt = document.createElement('option')
        opt.value = arr[i].id
        opt.innerHTML = arr[i].name
        opt.dataset.name = arr[i].name
        kelurahan.appendChild(opt)
    }

    // add event listener submit pesan
    pesan.addEventListener('submit', (e) => {
        e.preventDefault()
        let data = $('form#pesan').serializeArray()
        let nameProv = ''
        let nameKab = ''
        let nameKec = ''
        let nameKel = ''
        $.ajax({
            url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/province/' + data[3].value + '.json',
            success: function (res) {
                let resA = JSON.parse(res)
                nameProv = resA.name

                $.ajax({
                    url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/regency/' + data[4].value + '.json',
                    success: function (res) {
                        let resA = JSON.parse(res)
                        nameKab = resA.name

                        $.ajax({
                            url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/district/' + data[5].value + '.json',
                            success: function (res) {
                                let resA = JSON.parse(res)
                                nameKec = resA.name

                                $.ajax({
                                    url: 'https://raw.githubusercontent.com/saktiID/API-Alamat-Indonesia/main/api/village/' + data[6].value + '.json',
                                    success: function (res) {
                                        let resA = JSON.parse(res)
                                        nameKel = resA.name

                                        let dataFix = {
                                            'link': data[0].value,
                                            'nama': data[1].value,
                                            'nomor': data[2].value,
                                            'prov': nameProv,
                                            'kab': nameKab,
                                            'kec': nameKec,
                                            'kel': nameKel,
                                            'ket': data[7].value
                                        }

                                        sendWa(dataFix)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

        let sendWa = (data) => {
            let msg = `PESANAN%20SAYA%0A%0ALink%3A%20${data.link}%0ANama%3A%20${data.nama}%0ANomor%3A%20${data.nomor}%0AProvinsi%3A%20${data.prov}%0AKabupaten%3A%20${data.kab}%0AKecamatan%3A%20${data.kec}%0AKelurahan%3A%20${data.kel}%0AKeterangan%3A%20${data.ket}%0A%0AMohon%20segera%20konfirmasi%20pesanan%20saya%20ya%21%0ATerimakasih%2C`
            let myNumb = '6285607369678'
            let url = `https://api.whatsapp.com/send?phone=${myNumb}&text=${msg}`
            window.open(url);
        }






    })










})