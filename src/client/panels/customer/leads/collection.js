import {Collection} from 'backbone';
import Model from './model';

let config = Radio.request('global', 'config');

class CustomerLeadsCollection extends Collection {
	model = Model,
	url(){
		return config.api_base + '/customer/leads'
	}
}

export default CustomerLeadsCollection;