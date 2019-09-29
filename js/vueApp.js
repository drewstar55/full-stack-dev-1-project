//
// cryptocompare api returns conversion from passed cryptocurrency symbols to passed fiat currencies
//
const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=CAD";

const vm = new Vue({
          el: '#app',
          data: {
            results: []
          },
          mounted() {
              this.upDate();
              // update data every 4 seconds
              this.timer = setInterval(this.upDate, 4000)
          },

      methods:{

      upDate: function() {
            axios.get(url).then(response => {
                  this.results = response.data;
                  //console.log(this.results);
                  var product = 0;
                  var cdnRate = this.results.BTC.CAD;
                  var multiplier = removeCommas(document.getElementById("currOp").innerHTML);
                  product = cdnRate * multiplier;
                  //console.log("product = " + product);
                  document.getElementById("cdnVal").innerHTML = formatCurrency(cdnRate);

                  if (product > 0) {
                    console.log("product = " + product);
                      document.getElementById("cdnTot").value = formatCurrency(product);
                  } else {
                      document.getElementById("cdnTot").value = "$0.00";
                  }
            })
      },
      cancelAutoUpdate: function() { clearInterval(this.timer) },

      beforeDestroy() { clearInterval(this.timer) }

    } // methods
  }); // vue
