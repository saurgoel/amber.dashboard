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

	ui: {
		menuIcon: '.sidebar-toggle',
		subpanel: '.subpanel'
	},

	events: {
		'click @ui.menuIcon': 'toggleSidebar'
	},

	templateHelpers(){
		return {
			getLogoutUrl(){
				let config = Radio.request('global', 'config');
				return `${config.accounts_api_url}/auth/accounts/logout?redirect_to=${window.location.origin}`
			}
		}
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