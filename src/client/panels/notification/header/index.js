import {ItemView} from 'marionette';
import { WithCSS, ProtoProp } from 'utils';

import tpl from './template.jade';
import style from './style.styl';

import Model from './model';

@WithCSS(style)
@ProtoProp({
  className: 'view-notification-header',
  model: new Model()
})
class NotificationHeader extends ItemView {
  template = tpl

  ui(){
    return {
      tab: '.subpanel-tabs li a'
    }
  }

  events() {
    return {
      'click @ui.tab': 'selectTab'
    }
  }

  onRender(){
    let frag = Backbone.history.getFragment();
    this
      .getTabByFrag(frag)
      .parent()
      .addClass('is-active')
  }

  selectTab(e){
    var frag = $(e.currentTarget).attr('href');

    this.getActiveTab().parent().removeClass('is-active');
    this.getTabByFrag(frag).parent().addClass('is-active');

    Radio.trigger('global', 'approuter:navigate', frag)

    e.preventDefault();
  }

  getActiveTab(){
    return this.$(this.ui.tab.selector + '.is-active')
  }

  getTabByFrag(frag){
    return this.$(this.ui.tab.selector).filter(function(i){
      return $(this).attr('href').indexOf(frag) !== -1
    })
  }

};

export default NotificationHeader;