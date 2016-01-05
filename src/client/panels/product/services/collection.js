import {Collection} from 'backbone';
import {_Global} from 'channels';

const config = _Global.request('config');

var ProductServices = Collection.extend({
  url: config.products_api_url + '/services.json',

  parse(response){
    this.count = response.data.length;
    return response.data;
  }
});

export default ProductServices;