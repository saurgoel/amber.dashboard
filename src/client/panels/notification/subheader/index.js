import {ItemView} from 'marionette';
import tpl from './template.jade';


var NotificationSubHeader = ItemView.extend({
	template: tpl,
	className: 'view-notification-subheader',


});

export default NotificationSubHeader;