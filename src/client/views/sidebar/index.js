import {ItemView} from 'marionette';
import Radio from 'radio';
import Model from './model';
import tpl from './template.jade';
import style from './style.styl';

let Channel = Radio.channel('global');

const SidebarView = ItemView.extend({
	template: tpl,
	className: 'view-sidebar',
	model: new Model(),

	ui: {
		backbutton: '.sidebar-header .back-button',
		backdrop: '.sidebar-backdrop',
		menuItem: '.list-categories-item'
	},
	events: {
		'click @ui.backdrop'  : 'toggleSidebar',
		'click @ui.backbutton': 'toggleSidebar',
		'click @ui.menuItem': 'selectMenu'
	},
	
	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);

		this.listenTo(Channel, 'sidebar:toggle', this.toggleSidebar);
	},

	selectMenu(e){
		let route = e.currentTarget.getAttribute('data-route');
		this.model.selectMenu({route});
		Radio.trigger('global', 'approuter:navigate', route)
	},

	toggleSidebar(e){
		this.$el.parent().toggleClass('is-active');
		this.ui.backdrop.toggleClass('is-active', this.$el.parent().hasClass('is-active'));
	}

})

export default SidebarView;