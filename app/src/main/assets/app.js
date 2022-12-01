route('/', 'home.html');
route('/kesehatan', 'kesehatan.html');
route('/pangan', 'pangan.html');
route('/wisata', 'wisata.html');
route('/pendidikan', 'pendidikan.html');
route('/bmkg', 'bmkg.html');

function main() {
   let app = new App();
   app.setParam('kesehatan', 'kesehatan.html');
   app.setParam('kesehatan-details', 'kesehatan-view.html');
   app.setParam('wisata', 'wisata.html');
   app.setParam('wisata-details', 'wisata-view.html');
   return {
      title: "KalselGo",
      logo: "assets/img/logo2.png",
      description: "Eksplorasi Kalsel dalam genggaman.",
      menu_pemerintah: [{
            nama: "Siaga",
            link: "#/siaga",
            icon: "fa-bell"
         },
         {
            nama: "Kesehatan",
            link: "#/kesehatan",
            icon: "fa-hospital"
         },
         {
            nama: "Pendidikan",
            link: "#/pendidikan",
            icon: "fa-school"
         },
         {
            nama: "BMKG",
            link: "#/bmkg",
            icon: "fa-smog"
         }
      ],
      menu_publik: [{
            nama: "Wisata",
            link: "#/wisata",
            icon: "fa-umbrella-beach"
         },
         {
            nama: "Belanja",
            link: "#/belanja",
            icon: "fa-store"
         },
         {
            nama: "Pangan",
            link: "#/pangan",
            icon: "fa-utensils"
         },
         {
            nama: "Loker",
            link: "#/loker",
            icon: "fa-briefcase"
         }
      ]
   };
}

function getBMKG() {
   return {
      dataBMKG: null,
      isLoading: false,
      fetchBMKG() {
         this.isLoading = true;
         fetch(`https://cuaca-gempa-rest-api.vercel.app/weather/kalimantan-selatan`)
            .then((res) => res.json())
            .then((data) => {
               this.isLoading = false;
               this.dataBMKG = data;
            });
      },
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

function getSekolah() {
   return {
      dataSearch: "",
      dataSekolah: null,
      isLoading: false,
      open: false,
      open_data: false,
      fetchSekolah() {
         this.open_data = false;
         this.isLoading = true;
         fetch(`https://api-sekolah-indonesia.herokuapp.com/sekolah/s?sekolah=${this.dataSearch}&perPage=100`)
            .then((res) => res.json())
            .then((data) => {
               this.isLoading = false;
               var data2 = data;
               var datanya = [];
               this.open_data = true;
               for (var i = 0; i < data2.dataSekolah.length; i++) {
                  if (data2.dataSekolah[i].propinsi == "Prov. Kalimantan Selatan") {
                     datanya.push(data2.dataSekolah[i]);
                  }
               }
               this.dataSekolah = {
                  "status": 200,
                  "dataSekolah": datanya
               };
               document.getElementById('pendidikan-search').style.display = 'block';
            });

      },
   };
}


function getDestinasiWisata1() {
   var parameter = location.hash.split("/");
   if (parameter[2]) {
      var wisata_param = parameter[2];
   } else {
      var wisata_param = "";
   }
   return {
      dataSearch: wisata_param.replace(/%20/g, " "),
      dataWisata: null,
      isLoading: false,
      open: false,
      open_data: false,
      fetchWisata() {
         this.open_data = false;
         this.isLoading = true;
         fetch(`https://api.npoint.io/23ec7b17de445201a198`)
            .then((res) => res.json())
            .then((data) => {
               this.isLoading = false;
               var data2 = data;
               var datanya = [];
               this.open_data = true;
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
   if (parameter[2]) {
      var rs_param = parameter[2];
   } else {
      var rs_param = "";
   }
   if (parameter[3]) {
      var nm_param = parameter[3].replace(/%20/g, " ");
   } else {
      var nm_param = "";
   }
   return {
      dataName: nm_param,
      dataSearch: rs_param,
      dataRumahSakit: null,
      open: false,
      isLoading: false,
      open_data: false,
      fetchRumahSakit() {
         this.open_data = false;
         this.isLoading = true;
         fetch(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=63prop&cityid=${this.dataSearch}&type=2`)
            .then((res) => res.json())
            .then((data) => {
               this.isLoading = false;
               this.open_data = true;
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