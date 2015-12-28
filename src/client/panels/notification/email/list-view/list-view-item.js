import {ItemView} from 'marionette';
import tpl from './template-list-item.jade';

var EmailItem = ItemView.extend({
	template: tpl,
  tagName: 'li',
	className: 'view-email-item'
})

export default EmailItem;