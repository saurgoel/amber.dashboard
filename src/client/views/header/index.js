import {ItemView} from 'marionette';
import tpl from './template.jade';

import Radio from 'radio';

import style from './style.styl';

var HeaderView = ItemView.extend({
	template: tpl,
	className: 'view-header',

	ui: {
		menuIcon: '#sidebar-toggle'
	},
	events: {
		'click @ui.menuIcon': 'toggleSidebar'
	},

	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);
	},

	toggleSidebar(e){
		Radio.trigger('global', 'sidebar:toggle')
	}
});

export default HeaderView;