import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';
import {WithCSS} from 'utils';

@WithCSS(style)
class EmailsView extends LayoutView {
  constructor(options){
    super(options);

    this.template  = tpl;
    this.className = 'layout-emails-view';

    this.regions = {
      ListView: '#region-list-view',
      Item:  '#region-item-view'
    }
  }

  initialize(options){
    console.log('EmailsView:Options', options);
  }

}

export default EmailsView;