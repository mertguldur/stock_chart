import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  average: DS.attr('string')
});
