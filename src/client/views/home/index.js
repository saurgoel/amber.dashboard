import {ItemView} from 'marionette';
import tpl from './template.jade';

import style from './style.styl';

var HomePageView = ItemView.extend({
	template: tpl,
	classname: 'view-homepage',

	initialize(){
		this.listenTo(this, 'render', style.use);
		this.listenTo(this, 'destroy', style.unuse);
	}
});

export default HomePageView;