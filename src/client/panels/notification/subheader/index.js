import {ItemView} from 'marionette';
import tpl from './template.jade';

import style from './style.styl';

var NotificationSubHeader = ItemView.extend({
	template: tpl,
	className: 'view-notification-subheader',

	templateHelpers(){
		return ()=> { 
			let locals = ()=> style.locals ? style.locals : style.use().locals;
			return {locals}
		}
	},

	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
	},
	
	onAttach(){
		this.$('.tabs').tabs();
	}

});

export default NotificationSubHeader;