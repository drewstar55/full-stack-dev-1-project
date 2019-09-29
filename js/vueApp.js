//
// cryptocompare api returns conversion from passed cryptocurrency symbols to passed fiat currencies
//
const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=CAD";

const vm = new Vue({
          el: '#app',
          data: {
            results: []
          },
          mounted() {
              this.upDate();
                console.log("product = " + product)
              this.timer = setInterval(this.upDate, 1000)
          },

      methods:{

      upDate: function() {
            axios.get(url).then(response => {
                  this.results = response.data;
                  //console.log(this.results);
                  var product = 0;
                  var cdnRate = parseFloat(this.results.BTC.CAD);
                  var multiplier = parseFloat(document.getElementById("currOp").innerHTML);
                  product = cdnRate * Number(multiplier.replace(/\,/g,'');
                  //console.log("product = " + product);
                  document.getElementById("cdnVal").innerHTML = "$" + cdnRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

                  if (product > 0) {
                      document.getElementById("cdnTot").value = "$" + product;
                  } else {
                      document.getElementById("cdnTot").value = "$0.00";
                  }
            })
      },
      cancelAutoUpdate: function() { clearInterval(this.timer) },

      beforeDestroy() { clearInterval(this.timer) }

    } // methods
  }); // vue
