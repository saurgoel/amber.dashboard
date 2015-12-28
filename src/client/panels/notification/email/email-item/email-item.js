import {ItemView} from 'marionette';
import {WithCSS} from 'utils';

import tpl from './template-email.jade';



class EmailItem extends ItemView {
  template = tpl
  initialize(){

  }
}


export default EmailItem;