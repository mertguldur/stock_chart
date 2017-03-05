import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then((filterResults) => this.set('companies', filterResults));
    }
  }

});
