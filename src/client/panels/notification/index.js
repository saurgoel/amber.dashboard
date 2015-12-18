import {Collection} from 'backbone';
import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

import SideNav from 'components/sidenav';
import SubHeader from './subheader';

var NotificationPanelLayout = LayoutView.extend({
	template : tpl,
	className: 'layout-notification-panel',
	regions: {
		Sidebar: '#region-notification-sidebar',
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
		this.initSubHeader();
		
		// Sidebar
		// let collection = new Collection(this.sidebar_links);
		// this.getRegion('Sidebar').show( new SideNav({collection}) );

		// Subpanel
		if (!this.subpanel) return
		let region = this.getRegion('Content');
		require.ensure([], ()=>{
			var view = require('./' + this.subpanel + '/index.js');
			this.getRegion('Content').show(new view());
		});
	},

	initSubHeader(){
		this.subheaderView = new SubHeader();
		Radio.trigger('header', 'update:subheader:title', 'Notification')
		Radio.trigger('header', 'update:subheader', this.subheaderView);
	}

});

export default NotificationPanelLayout;