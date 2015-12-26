import {ItemView} from 'marionette';
import tpl from './template.jade';

import style from './style.styl';
import { UseCSS } from 'behaviors/index';

var NotificationHeader = ItemView.extend({
	template: tpl,
	className: 'view-notification-header',
	behaviors: { UseCSS: {style} },

  onRender(){
    var frag = Backbone.history.getFragment()

  }

});

export default NotificationHeader;