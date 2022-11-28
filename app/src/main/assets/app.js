route('/', 'home.html');
route('/kesehatan', 'kesehatan.html');
route('/pangan', 'pangan.html');
route('/wisata', 'wisata.html');
var parameter = location.hash.split("/");
function main() {
    let parsedata = new Http();
    let app = new App();
    var parameter = location.hash.split("/");
    if (parameter[1] == "kesehatan" && parameter[2]) {
        parsedata.get('view', 'views/kesehatan.html');
    }
    if (parameter[1] == "kesehatan-details" && parameter[2]) {
        parsedata.get('view', 'views/kesehatan-view.html');
    }
    if (parameter[1] == "wisata" && parameter[2]) {
        parsedata.get('view', 'views/wisata.html');
    }
    if (parameter[1] == "wisata-details" && parameter[2]) {
        parsedata.get('view', 'views/wisata-view.html');
    }
    return {
        title: "KalselGo",
        logo: "assets/img/logo2.png",
        description: "Eksplorasi Kalsel dalam genggaman."
    };
}

function getHargaPangan() {
    return {
        dataPangan: null,
        isLoading: false,
        fetchPangan() {
            this.isLoading = true;
            fetch(`https://api.npoint.io/7bf1b4ab6559c253b1e8`)
                .then((res) => res.json())
                .then((data) => {
                    this.isLoading = false;
                    this.dataPangan = data;
                });
        },
    };
}

function getDestinasiWisata1() {
    var parameter = location.hash.split("/");
    if(parameter[2]) {
        var wisata_param = parameter[2];
    }else{
        var wisata_param = "";
    }
    return {
        dataSearch: wisata_param.replace(/%20/g, " "),
        dataWisata: null,
        isLoading: false,
        open: false,
        open_data: true,
        fetchWisata() {
            this.open_data = true;
            this.isLoading = true;
            fetch(`https://api.npoint.io/23ec7b17de445201a198`)
                .then((res) => res.json())
                .then((data) => {
                    this.isLoading = false;
                    var data2 = data;
                    var datanya = []
                    var filter = this.dataSearch;
                    if (filter) {
                        for (var i = 0; i < data2.wisata.length; i++) {
                            if (data2.wisata[i].location == filter) {
                                datanya.push(data2.wisata[i]);
                            }
                        }
                        this.dataWisata = {
                            "status": 200,
                            "wisata": datanya
                        };
                        console.log(JSON.stringify(this.dataWisata));
                    } else {
                        this.dataWisata = data;
                    }
                    document.getElementById('wisata-search').style.display = 'block';
                });

        },
    };
}

function getRumahSakit() {
    var parameter = location.hash.split("/");
    if(parameter[2]) {
        var rs_param = parameter[2];
    }else{
        var rs_param = "";
    }
    if(parameter[3]) {
        var nm_param = parameter[3].replace(/%20/g, " ");
    }else{
        var nm_param = "";
    }
    return {
        dataName: nm_param,
        dataSearch: rs_param,
        dataRumahSakit: null,
        open: false,
        isLoading: false,
        open_data: true,
        fetchRumahSakit() {
            this.open_data = true;
            this.isLoading = true;
            fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=63prop&cityid=${this.dataSearch}&type=2`)
                .then((res) => res.json())
                .then((data) => {
                    this.isLoading = false;
                    this.dataRumahSakit = data;
                });
        },
    };
}

function getHospitalDetails() {
    var parameter = location.hash.split("/");
    return {
        paramnya: parameter[3],
        dataSearch: parameter[2],
        dataRumahSakit1: null,
        isLoading: false,
        fetchRumahSakit1() {
            this.isLoading = true;
            fetch('https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=' + parameter[2] + '&type=2')
                .then((res) => res.json())
                .then((data) => {
                    this.isLoading = false;
                    this.dataRumahSakit1 = data;
                });
        },
    };
}

function getWisataDetails() {
    var parameter = location.hash.split("/");
    idnya = parameter[2] - 1;
    return {
        dataSearch: parameter[2],
        dataWisataDetails: null,
        isLoading: false,
        fetchWisataDetails() {
            this.isLoading = true;
            fetch('https://api.npoint.io/23ec7b17de445201a198')
                .then((res) => res.json())
                .then((data) => {
                    this.isLoading = false;
                    this.dataWisataDetails = data;
                });
        },
    };
}
ready(main);