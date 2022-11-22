route('/', 'home.html');
route('/kesehatan', 'kesehatan.html');
route('/pangan', 'pangan.html');
route('/wisata-view', 'wisata-view.html');
var parameter = location.hash.split("/");
function main() {
    let parsedata = new Http();
    let app = new App();
    var parameter = location.hash.split("/");
    if(parameter[1] == "kesehatan" && parameter[2]) {
      parsedata.get('view','views/kesehatan-view.html');
    }
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
function getDestinasiWisata() {
  return {
    dataWisata: null,
    isLoading: false,
    fetchWisata() {
      this.isLoading = true;
      fetch(`https://api.npoint.io/23ec7b17de445201a198`)
        .then((res) => res.json())
        .then((data) => {
          this.isLoading = false;
          this.dataWisata = data;
        });
    },
  };
}
function startSearch() {
    return {
      dataSearch: "6372",
      dataRumahSakit: null,
      isLoading: false,
      fetchRumahSakit() {
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
ready(main);
