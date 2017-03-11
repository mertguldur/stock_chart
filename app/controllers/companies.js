import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterCompanies(prefix, page) {
      if (prefix !== '') {
        return this.get('store').query('company', { prefix: prefix, page: page });
      } else {
        return new Ember.RSVP.Promise(function(resolve, reject) {
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
