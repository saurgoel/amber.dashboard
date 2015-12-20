import {LayoutView} from 'marionette';
import Radio from 'radio';

import tpl from './template.jade';
import style from './style.styl';

const HeaderChannel = Radio.channel('header');

class HeaderView extends LayoutView {

	get className(){ return 'view-header' }
	
	template = tpl
	
	regions = {
		SubHeader: '#region-sub-header'
	}
	
	ui = {
		menuIcon: '#sidebar-toggle',
		subheaderTitle: '.sub-header-title'
	}

	events = {
		'click @ui.menuIcon': 'toggleSidebar'
	}

	initialize(){
		this.listenTo(this, 'render' , style.use);
		this.listenTo(this, 'destroy', style.unuse);
		
		this.listenTo(HeaderChannel, 'update:subheader', this.updateSubheader);
		this.listenTo(HeaderChannel, 'update:subheader:title', this.updateSubheaderTitle);
	}
	updateSubheader(viewInstance){
		this.getRegion('SubHeader').show(viewInstance);
	}
	updateSubheaderTitle(title){
		this.ui.subheaderTitle.text(title ? title : 'Title');
	}
	toggleSidebar(e){
		Radio.trigger('global', 'sidebar:toggle')
	}

}

// var HeaderView = LayoutView.extend({
// 	template: tpl,
// 	className: 'view-header',
// 	regions: {
// 		SubHeader: '#region-sub-header'
// 	},
// 	ui: {
// 		menuIcon: '#sidebar-toggle',
// 		subheaderTitle: '.sub-header-title'
// 	},
// 	events: {
// 		'click @ui.menuIcon': 'toggleSidebar'
// 	},

// 	initialize(){
// 		this.listenTo(this, 'render' , style.use);
// 		this.listenTo(this, 'destroy', style.unuse);
		
// 		this.listenTo(HeaderChannel, 'update:subheader', this.updateSubheader);
// 		this.listenTo(HeaderChannel, 'update:subheader:title', this.updateSubheaderTitle);
// 	},
// 	updateSubheader(viewInstance){
// 		this.getRegion('SubHeader').show(viewInstance);
// 	},
// 	updateSubheaderTitle(title){
// 		this.ui.subheaderTitle.text(title ? title : 'Title');
// 	},
// 	toggleSidebar(e){
// 		Radio.trigger('global', 'sidebar:toggle')
// 	}
// })

export default HeaderView;