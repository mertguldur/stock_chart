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
      action(company.id).then((fetchResults) => this.set('quotes', fetchResults));
    }
  }

});
