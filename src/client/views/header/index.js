import {LayoutView} from 'marionette';
import Radio from 'radio';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

const HeaderChannel = Radio.channel('header');


var HeaderView = LayoutView.extend({
	template: tpl,
	className: 'view-header',

	behaviors: {UseCSS: {style}},

	regions: {
		SubHeader: '#region-sub-header'
	},

	ui: {
		menuIcon: '.sidebar-toggle',
		subpanel: '.subpanel'
	},

	events: {
		'click @ui.menuIcon': 'toggleSidebar'
	},

	initialize(){
		this.listenTo(HeaderChannel, 'update:sub-title', this.updateSubtitle);
	},

	updateSubtitle(title, url){
		this.ui.subpanel
			.attr('href', url)
			.text(title);
	},
	toggleSidebar(e){
		Radio.trigger('global', 'sidebar:toggle')
	}
})

export default HeaderView;