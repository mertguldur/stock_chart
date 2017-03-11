import { test } from 'qunit';
import moduleForAcceptance from 'stock-chart/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | stock chart');

test('visiting the page', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('tbody tr').length, 0, 'should not show any results');
  });
});

test('searching companies with empty prefix', function(assert) {
  visit('/');
  fillIn('input', '');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    assert.equal(find('tbody tr').length, 0, 'should not show any results');
  });
});

test('searching companies with a common prefix', function(assert) {
  visit('/');
  fillIn('input', 'A');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    assert.equal(find('tbody tr').length, 2, 'should include two results');

    let firstCompany = find('tbody tr:nth-child(1) td:nth-child(2)').text();
    let secondCompany = find('tbody tr:nth-child(2) td:nth-child(2)').text();

    assert.equal(firstCompany, 'Alphabet Inc.', 'should match the company name');
    assert.equal(secondCompany, 'Appfolio Inc.', 'should match the company name');
  });
});

test('searching companies with a specific prefix', function(assert) {
  visit('/');
  fillIn('input', 'Apple');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    assert.equal(find('tbody tr').length, 1, 'should include one result');

    let company = find('tbody tr:nth-child(1) td:nth-child(2)').text();
    assert.equal(company, 'Apple Inc.', 'should match the company name');
  });
});

test('going to next page', function(assert) {
  visit('/');
  fillIn('input', 'A');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    click('button:contains("Next")');
    andThen(function() {
      assert.equal(find('tbody tr').length, 1, 'should include one result');

      let company = find('tbody tr:nth-child(1) td:nth-child(2)').text();
      assert.equal(company, 'Apple Inc.', 'should match the company name');
    });
  });
});

test('going to previous page', function(assert) {
  visit('/');
  fillIn('input', 'A');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    click('button:contains("Next")');
    andThen(function() {
      click('button:contains("Previous")');
      andThen(function() {
        assert.equal(find('tbody tr').length, 2, 'should include two results');

        let firstCompany = find('tbody tr:nth-child(1) td:nth-child(2)').text();
        let secondCompany = find('tbody tr:nth-child(2) td:nth-child(2)').text();

        assert.equal(firstCompany, 'Alphabet Inc.', 'should match the company name');
        assert.equal(secondCompany, 'Appfolio Inc.', 'should match the company name');
      });
    });
  });
});

test('clicking chart button', function(assert) {
  visit('/');
  fillIn('input', 'Apple');
  keyEvent('input', 'keyup', 69);
  andThen(function() {
    click('button:contains("Chart")');
    andThen(function() {
      assert.equal(find('canvas').length, 1, 'should generate a chart on the right side');
    });
  });
});

