import {Model, Collection} from 'backbone';
import {_Global} from 'channels';

const config = _Global.request('config');


var ProductProvider = Model.extend({

  parse(resp){
    return _.extend({}, resp.data, _.omit(resp, 'data'))
  }

});


var ProductProviders  = Collection.extend({
  model: ProductProvider,

  url(){
    return `${config.products_api_url}/providers/requests.json`
  },

  parse(response){
    this.meta = response.data.meta;
    return response.data.results;
  }
})

export default ProductProviders;