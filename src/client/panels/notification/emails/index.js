import {CompositeView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

import Collection from './collection';
import ChildView from './item';

var NotificationEmailsView = CompositeView.extend({
	className: 'view-notification-emails',
	template: tpl,

	behaviors: { UseCSS: {style} },

	childView: ChildView,
	childViewContainer: '.list-wrapper ul.emails-list',
	collection: new Collection(),

	initialize(){
		this.collection.fetch();
		console.log('This is ready.')
	},

})

export default NotificationEmailsView;