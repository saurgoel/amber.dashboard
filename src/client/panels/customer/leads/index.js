import {CompositeView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

const CustomerLeadsView = CompositeView.extend({
	template: tpl,
	className: 'view-customer-leads',
	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
	}
})

export default CustomerLeadsView;