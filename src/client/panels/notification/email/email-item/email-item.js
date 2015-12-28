import {ItemView} from 'marionette';
import {WithCSS} from 'utils';

import tpl from './template-email.jade';

var EmailChannel = Radio.channel('email');

class EmailItem extends ItemView {
  template = tpl
  initialize(){
    this.listenTo(EmailChannel, 'item:selected', this.updateEmail);
  }
  updateEmail(model){
    this.model = model;
    this.render();
  }
}


export default EmailItem;