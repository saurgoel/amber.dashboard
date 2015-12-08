import {ItemView} from 'marionette';
import tpl from './template.jade';

const NotFoundView = ItemView.extend({
	template: tpl,
	className: 'view-notfound'
	
});

export default NotFoundView;