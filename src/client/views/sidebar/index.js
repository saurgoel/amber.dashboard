import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import Radio from 'radio';
import Model from './model';
import tpl from './template.jade';
import style from './style.styl';

let Channel = Radio.channel('global');

const SidebarView = ItemView.extend({
	template: tpl,
	className: 'view-sidebar',
	model: Model,

	behaviors: { UseCSS: {style} },

	ui: {
		backbutton: '.sidebar-header .back-button',
		backdrop: '.sidebar-backdrop',
		menuItem: '.list-categories-item > a'
	},
	events: {
		'click @ui.backdrop'  : 'toggleSidebar',
		'click @ui.backbutton': 'toggleSidebar',
		'click @ui.menuItem': 'hideSidebar'
	},

	initialize(){
		this.listenTo(Channel, 'sidebar:toggle', this.toggleSidebar);
	},

	hideSidebar(){
		_.delay( ()=> {return this.toggleSidebar()} , 200);
	},

	toggleSidebar(e){
		this.$el.parent().toggleClass('is-active');
		this.ui.backdrop.toggleClass(
			'is-active',
			this.$el.parent().hasClass('is-active')
		);
	}

})

export default SidebarView;