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
	
	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);

		this.listenTo(Channel, 'sidebar:toggle', this.toggleSidebar);
	},

	toggleSidebar(e){
		this.$el.parent().toggleClass('is-active');
	}

})

export default SidebarView;