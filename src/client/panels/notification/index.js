import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

class NotificationPanelLayout extends LayoutView {
	constructor(...args){
		super(...args)
		this.template = tpl
		this.className= 'layout-notification-panel'
	}
	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
		console.log('Notification Panel Layout Ready')
	}
};

export default NotificationPanelLayout;