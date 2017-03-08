import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    handleFilterEntry() {
      let input = this.get('value');
      let action = this.get('filter');
      action(input).then((filterResults) => this.set('companies', filterResults));
    },

    handleChartButton(company) {
      let input = this.get('name');
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
