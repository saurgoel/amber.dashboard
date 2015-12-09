import {Collection} from 'backbone';
import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

import SideNav from 'components/sidenav';
import SubHeader from './subheader';

var NotificationPanelLayout = LayoutView.extend({
	template : tpl,
	className: 'layout-notification-panel',

	sidebar_links: [
		{ name: 'Emails',  href: '/notification/emails' },
		{ name: 'SMS', href: '/notification/sms' },
		{ name: 'Push Notifications', href: '/notification/push' },
	],
	
	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);

		this.listenToOnce(this, 'render', this.initSubHeader);

		// this.listenTo(this, 'render', this.renderViews)
		console.log('Notification Panel Layout Ready')
	},

	renderViews(){
		this.sidebarView = this.sidebarView || new SideNav({collection: this.sidebar_links});
		this.getRegion('Sidebar').show( this.sidebarView )
	},

	initSubHeader(){
		this.subheaderView = new SubHeader();
		Radio.trigger('header', 'update:subheader:title', 'Notification Service')
		Radio.trigger('header', 'update:subheader', this.subheaderView);
	}

});

export default NotificationPanelLayout;