import {LayoutView} from 'marionette';
import Radio from 'radio';

import tpl from './template.jade';
import style from './style.styl';

const HeaderChannel = Radio.channel('header');


var HeaderView = LayoutView.extend({
	template: tpl,
	className: 'view-header',
	regions: {
		SubHeader: '#region-sub-header'
	},
	ui: {
		menuIcon: '.sidebar-toggle',
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
})

export default HeaderView;