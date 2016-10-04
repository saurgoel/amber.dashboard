import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';
import {WithCSS, ProtoProp} from 'utils';

import ListView  from './list-view/list-view';
import EmailView from './email-item/email-item';


@ProtoProp({className: 'layout-emails-view'})
@WithCSS(style)
class EmailsView extends LayoutView {
  template = tpl
  regions(){
    return {
      ListView: '.region-list',
      Item:  '.region-email'
    }
  }

  initialize(options){

    this.listview  = new ListView();
    this.emailview = new EmailView();

    this.listenTo(this.listview, 'item:selected', this.onEmailSelected);
  }

  onRender(){
    this.getRegion('ListView').show( this.listview );
    this.getRegion('Item').show( this.emailview );
  }

}

export default EmailsView;