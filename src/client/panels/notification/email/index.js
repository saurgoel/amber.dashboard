import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';
import {WithCSS, ProtoProp} from 'utils';


import ListView  from './list-view';
import EmailView from './email-item';


@WithCSS(style)
@ProtoProp({
  className: 'layout-emails-view',
  template: tpl,
  regions: {
    ListView: '.region-list',
    Item:  '.region-email'
  }
})
class EmailsView extends LayoutView {

  initialize(options){
    console.log('EmailsView:Options', options);
    this.listenTo(this, 'attach', this.initViews);
  }

  initViews(){
    this.getRegion('ListView').show( new ListView() )
    this.getRegion('Item').show( new EmailView() )
  }

}

export default EmailsView;