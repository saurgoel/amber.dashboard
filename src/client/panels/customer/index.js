import {LayoutView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';


const CustomerPanelView = LayoutView.extend({
	template: tpl,
	className: 'view-customerpanel',

	regions: {
		SubPanel: '#region-customer-subpanel'
	},
	
	initialize(options){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
	}

});

export default CustomerPanelView;