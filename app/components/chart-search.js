import Ember from 'ember';

export default Ember.Component.extend({
  page: 1,
  totalPages: 1,

  actions: {
    handleFilterEntry() {
      let input = this.get('value');
      let action = this.get('filterCompanies');
      let page = 1;
      action(input, page).then((filterResults) => {
        this.set('page', page);
        let meta = filterResults.get('meta');
        if (meta) {
          this.set('totalPages', meta.pagination['total-pages']);
        } else {
          this.set('totalPages', 1);
        }
        this.set('companies', filterResults);
      });
    },

    handlePageButton(direction) {
      let input = this.get('value');
      let action = this.get('filterCompanies');
      let page = this.get('page');
      page = direction === 'previous' ? page - 1 : page + 1;
      action(input, page).then((filterResults) => {
        this.set('page', page);
        this.set('companies', filterResults);
      });
    },

    handleChartButton(company) {
      let action = this.get('fetchQuotes');
      action(company.id).then((fetchResults) => {
        var data = {
          labels: [],
          datasets: []
        };
        var dataset = {
          label: "Average Price",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(0,0,128,0.4)",
          borderColor: "rgba(0,0,128,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(0,0,128,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(123,104,238,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          pointHitRadius: 10,
          data: []
        };
        fetchResults.forEach(function(quote) {
          dataset.data.push(quote.get('average'));
          data.labels.push(quote.get('date'));
        });
        data.datasets.push(dataset);
        this.set('quoteData', data);
      });
    }
  }

});
