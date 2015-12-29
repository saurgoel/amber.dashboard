import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template-list-item.jade';
import style from './style-item.styl';


var EmailItem = ItemView.extend({
	template: tpl,
  tagName: 'li',
  className: 'view-email-item',

  behaviors: {UseCSS: {style}},

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