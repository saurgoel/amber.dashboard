import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

import SideNav from 'components/sidenav';

const CustomerPanelView = LayoutView.extend({
	template: tpl,
	className: 'view-customerpanel',

	regions: {
		SideNav:  '#region-sidenav',
		SubPanel: '#region-customer-subpanel'
	},
	sidenav_items: {

	},
	
	initialize(options){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
	},
	onRender(){
		Radio.trigger('header', 'update:subheader:title', 'Customers')
		// this.getRegion('SideNav').show( new SideNav )
	}

});

export default CustomerPanelView;