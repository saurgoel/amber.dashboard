import {Collection} from 'backbone';
import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

// import SideNav from 'components/sidenav';
import SubHeader from './subheader';

var NotificationPanelLayout = LayoutView.extend({
	template : tpl,
	className: 'layout-notification-panel',
	regions: {
		Header: '#region-notification-header',
		Content: '#region-notification-content'
	},

	sidebar_links: [
		{ name: 'Emails',  href: '/notification/emails' },
		{ name: 'SMS', href: '/notification/sms' },
		{ name: 'Push Notifications', href: '/notification/push' },
	],

	initialize({subpanel}){
		this.subpanel = subpanel;

		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);

		this.listenTo(this, 'attach', this.renderViews);

		console.log('Notification Panel Layout Ready');
	},

	renderViews(){
		// Subheader
		this.subheaderView = new SubHeader();
		this.getRegion('Header').show(this.subheaderView)

		// Content
		if (this.subpanel)
			this.getRegion('Content').show( this.subpanel )
	}

});

export default NotificationPanelLayout;