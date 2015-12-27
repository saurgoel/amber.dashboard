import {ItemView} from 'marionette';

import tpl from './template-email.jade';

class EmailItem extends ItemView {
  constructor(options){
    super(options);
    this.template  = tpl;
  }

}


export default EmailItem;