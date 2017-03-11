export default function() {
  this.namespace = '/api';

  this.get('/companies', function(db, request) {
    let prefix = request.queryParams.prefix;
    let page = request.queryParams.page;
    let perPage = 2;
    let companies = [
      { id: 1, symbol: 'GOOG', name: 'Alphabet Inc.' },
      { id: 2, symbol: 'APPF', name: 'Appfolio Inc.' },
      { id: 3, symbol: 'AAPL', name: 'Apple Inc.' },
      { id: 4, symbol: 'FB', name: 'Facebook Inc.' }
    ];

    if (prefix) {
      let selectedCompanies = [];
      companies.forEach(function(company) {
        if (company.name.indexOf(prefix) === 0) {
          selectedCompanies.push(company);
        }
      });
      companies = selectedCompanies;
    }

    let totalCount = companies.length;
    let offset = (page - 1) * perPage;
    companies = companies.slice(offset, offset + perPage);

    return {
      data: companies.map(company => (
        { type: 'companies', id: company.id,
          attributes: { symbol: company.symbol, name: company.name } }
      )),
      meta: {
        pagination: {
          "per-page": perPage,
          "total-pages": Math.ceil(totalCount / perPage),
          "total-count": totalCount
        }
      }
    };
  });

  this.get('/quotes', function() {
    let quotes = [
      { id: 1, date: "2017-03-01", average: '150.72' },
      { id: 2, date: "2017-03-02", average: '152.57' }
    ];
    return {
      data: quotes.map(quote => (
        { type: 'quotes', id: quote.id,
          attributes: { quote: quote.date, average: quote.average } }
      ))
    };
  });
}
