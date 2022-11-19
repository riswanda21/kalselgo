route('/', 'home.html');
function main() {
    let parsedata = new Http();
    let app = new App();
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
ready(main);
