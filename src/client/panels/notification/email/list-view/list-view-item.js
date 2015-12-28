import {ItemView} from 'marionette';
import tpl from './template-list-item.jade';

var EmailItem = ItemView.extend({
	template: tpl,
  tagName: 'li',
	className: 'view-email-item',
  ui: {
    item: '.item-inner'
  },
  events: {
    'click @ui.item': 'selectEmail'
  },

  selectEmail(){
    Radio.trigger('email', 'item:selected', this.model);
  }

})

export default EmailItem;