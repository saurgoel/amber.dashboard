import {Collection} from 'backbone';
import {Global} from 'channels';
import Model from './model';


const config = Global.request('config');

var ProvidersCollection  = Collection.extend({
  model: Model,

  url(){
    return `${config.products_api_url}/providers/request.json`
  }

  parse(response){
    this.meta = response.data.meta;
    return response.data.results;
  }
})

export default ProvidersCollection;