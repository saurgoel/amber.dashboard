import {ItemView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';



var DashboardPage = ItemView.extend({
	template: tpl,
	className: 'view-dashboard-page',
	
	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);

		Radio.trigger('header', 'update:subheader:title', 'Dashboard');
	}
})

export default DashboardPage;