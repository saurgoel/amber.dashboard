import {Collection} from 'backbone';
import Model from './model';

let {notifications_api_url} = Radio.request('global', 'config');

var EmailsCollection = Collection.extend({
	model: Model,
	
	url: notifications_api_url + '/email/templates.json'

	parse: (response)=> response.data
});

export default EmailsCollection;