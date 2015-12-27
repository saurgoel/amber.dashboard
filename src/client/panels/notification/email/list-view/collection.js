import {Collection} from 'backbone';
import Model from './model';

let {notifications_api_url} = Radio.request('global', 'config');

var EmailsCollection = Collection.extend({
	model: Model,
	
	url: notifications_api_url + '/email/templates.json',

	parse(response){
		this.meta = response.data.meta;
		return response.data.result;
	},
	getMeta(){
		return this.meta || {};
	}
});

export default EmailsCollection;