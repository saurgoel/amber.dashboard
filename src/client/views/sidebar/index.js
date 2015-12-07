import {ItemView} from 'marionette';
import {Model} from 'backbone';
import Radio from 'radio';

import tpl from './template.jade';
import style from './style.styl';

var Channel = Radio.channel('global');

const SidebarModel = new Model({
	menus:{
		"Home" : "#/",
		"Dashboard" : "#/dashboard",
		"Stylist"   : "#/stylist",
		"Salon&Spa" : "#/salons",
		"Services"  : "#/services",
		"Products"  : "#/products",
		"Contents"  : "#/contents"
	}
});

const SidebarView = ItemView.extend({
	template: tpl,
	className: 'view-sidebar',
	model: SidebarModel,

	ui: {
		backbutton: '.sidebar-header .back-button',
		backdrop: '.sidebar-backdrop'
	},
	events: {
		'click @ui.backdrop'  : 'toggleSidebar',
		'click @ui.backbutton': 'toggleSidebar'
	},
	
	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);

		this.listenTo(Channel, 'sidebar:toggle', this.toggleSidebar);
	},

	toggleSidebar(e){
		this.$el.parent().toggleClass('is-active');
		this.ui.backdrop.toggleClass('is-active', this.$el.parent().hasClass('is-active'));
	}

})

export default SidebarView;