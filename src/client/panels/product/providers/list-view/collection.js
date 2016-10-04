import {Model, Collection} from 'backbone';
import {_Global} from 'channels';
import moment from 'moment';

const config = _Global.request('config');
const apis = {
  requests: `${config.products_api_url}/providers/requests.json`,
  new     : `${config.products_api_url}/providers.json?status=new&verified=false`,
  verified: `${config.products_api_url}/providers.json?status=new&verified=true&result=false`,
  review  : `${config.products_api_url}/providers.json?status=review&result=false`,
  active  : `${config.products_api_url}/providers.json?status=active&result=false`,
}


var ProductProvider = Model.extend({
  parse(resp){
    return _.extend({}, resp.data, _.omit(resp, 'data'), {
      time_created: moment(resp.created_at).fromNow(),
      time_updated: moment(resp.updated_at).fromNow()
    })
  }
});


var ProductProviders  = Collection.extend({
  model: ProductProvider,
  meta: {},
  service: 'requests',

  url(){
    return apis[this.service];
  },

  parse(response){
    this.meta = response.data.meta;
    return response.data.results;
  }

})

export default ProductProviders;