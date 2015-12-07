import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

class NotificationPanelLayout extends LayoutView {
	template = tpl
	className= 'layout-notification-panel'

	initialize(){
		console.log('Notification Panel Layout Ready')
	}
};

export default NotificationPanelLayout;