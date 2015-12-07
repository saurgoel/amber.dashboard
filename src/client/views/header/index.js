import {ItemView} from 'marionette';
import Radio from 'radio';

import tpl from './template.jade';
import style from './style.styl';





var HeaderView = ItemView.extend({
	template: tpl,
	className: 'view-header',
	ui: {
		menuIcon: '#sidebar-toggle',
		ddItem:  '.service-selector .dropdown-content a',
		ddTitle: '.service-selector .dropdown-button .title'
	},
	events: {
		'click @ui.menuIcon': 'toggleSidebar',
		'click @ui.ddItem'  : 'selectService'
	},

	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);
	},

	toggleSidebar(e){
		Radio.trigger('global', 'sidebar:toggle')
	},
	selectService(e){
		var text = $(e.currentTarget).text();
		this.ui.ddTitle.text(text);
		this.model.set('selectedService', text);
	},

	onAttach(){
		this.$('.dropdown-button').dropdown({
			hover: true, 
			belowOrigin: false,
			constrainWidth: false
		});
	}
});

export default HeaderView;