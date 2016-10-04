import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

const panels = [
  { name: 'Product Service', url: '/product',  icon: 'dashboard'},
  { name: 'Emails Service', url: '/notification/email',  icon: 'envelope'},
  { name: 'SMS Service', url: '/notification/sms',  icon: 'phone'},
  { name: 'PushNotifications Service', url: '/notification/push',  icon: 'push'},
  { name: 'Customer Service', url: '/customer',  icon: 'user'},
]


var HomePageView = ItemView.extend({
	template: tpl,
	className: 'view-homepage',

  behaviors: {UseCSS: {style}},

  templateHelpers(){
    return {
      panels,
    }
  },

	initialize(){
		Radio.trigger('header', 'update:sub-title', '')
	}

});

export default HomePageView;