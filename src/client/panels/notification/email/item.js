import {ItemView} from 'marionette';
import tpl from './template-item.jade';

var EmailItem = ItemView.extend({
	template: tpl,
	className: 'view-email-item'
})

export default EmailItem;