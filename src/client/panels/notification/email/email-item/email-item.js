import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template-email.jade';
import style from './style.styl';

var EmailChannel = Radio.channel('email');


var EmailItem = ItemView.extend({
  template: tpl,
  behaviors: {UseCSS: {style}},

  initialize(){
    this.listenTo(EmailChannel, 'item:selected', this.updateEmail);
  },

  updateEmail(model){
    this.model = model;
    this.render();
  }
})

export default EmailItem;