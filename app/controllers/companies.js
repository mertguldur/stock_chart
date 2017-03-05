import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterCompanies(param) {
      if (param !== '') {
        return this.get('store').query('company', { prefix: param });
      } else {
        return new Promise(function(resolve, reject) {
          resolve([]);
          reject('Failed to get an empty array');
        });
      }
    }
  }
});
