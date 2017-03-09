import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterCompanies(param, page) {
      if (param !== '') {
        return this.get('store').query('company', { prefix: param, page: page });
      } else {
        return new Promise(function(resolve, reject) {
          resolve([]);
          reject('Failed to get an empty array');
        });
      }
    },

    fetchQuotes(companyId) {
      return this.get('store').query('quote', { company_id: companyId });
    }
  }
});
