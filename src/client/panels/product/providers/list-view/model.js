import {Model} from 'backbone';
import {_Global} from 'channels';

const config = _Global.request('config');

let filters = {
  requests: {text: 'All', count: 0},
  new: {text: 'New', count: 0},
  verified: {text: 'Verified', count: 0},
  review: {text: 'Review', count: 0},
  active: {text: 'Active', count: 0},
};

let counts_api = {
  new     : config.products_api_url + '/providers.json?status=new&verified=false&result=false',
  verified: config.products_api_url + '/providers.json?status=new&verified=true&result=false',
  review  : config.products_api_url + '/providers.json?status=review&result=false',
  active  : config.products_api_url + '/providers.json?status=active&result=false',
};

var ProvidersViewModel = Model.extend({
  defaults: {
    selectedTab: null,
    filters: filters,
    meta: {},
  },

  updateCounts(){
    let keys = _.keys(counts_api);
    let urls = _.values(counts_api);
    return Promise
      .all( urls.map( url => Promise.resolve($.getJSON(url)) ))
      .then( responses => {
        var _filters = {};
        responses.map((k,i) => { _filters[keys[i]] = k.data.meta.count });
        return _filters;
      })
      .catch(console.error.bind(console))
  }

});

export default ProvidersViewModel;