import {LayoutView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

// import SideNav from 'components/sidenav';
import NotificationHeader from './header';

var NotificationPanelLayout = LayoutView.extend({
	template : tpl,
	className: 'layout-notification-panel',
	behaviors: {UseCSS: {style}},
	regions: {
		Header : '.region-notification-header',
		Content: '.region-notification-content'
	},

	initialize({subpanel}){
		this.subpanel = subpanel;
		this.listenTo(this, 'attach', this.renderViews);

		Radio.trigger('header', 'update:sub-title', 'Notification', '/notification');
	},

	renderViews(){
		// Subheader
		this.headerView = new NotificationHeader();
		this.getRegion('Header').show(this.headerView)

		// Content
		if (this.subpanel)
			this.getRegion('Content').show( this.subpanel )
	}

});

export default NotificationPanelLayout;