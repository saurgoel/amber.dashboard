import {LayoutView} from 'marionette';
import Radio from 'radio';

import tpl from './template.jade';
import style from './style.styl';


var HeaderChannel = Radio.channel('header');

var HeaderView = LayoutView.extend({
	template: tpl,
	className: 'view-header',
	ui: {
		menuIcon: '#sidebar-toggle',
		subheaderTitle: '.sub-header-title'
	},
	events: {
		'click @ui.menuIcon': 'toggleSidebar'
	},

	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);
		this.listenTo(HeaderChannel, 'update:subheader:title', this.updateSubheaderTitle);
	},
	updateSubheaderTitle(title){
		this.ui.subheaderTitle.text(title ? title + '>' : 'Title');
	},
	toggleSidebar(e){
		Radio.trigger('global', 'sidebar:toggle')
	}
})

export default HeaderView;