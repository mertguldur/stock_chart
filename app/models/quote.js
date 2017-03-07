import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  low: DS.attr('string'),
  high: DS.attr('string'),
  open: DS.attr('string'),
  close: DS.attr('string')
});
