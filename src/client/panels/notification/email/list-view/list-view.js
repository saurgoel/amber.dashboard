import {CompositeView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template-list.jade';
import style from './style.styl';

import Collection from './collection';
import ChildView from './list-view-item';
import EmptyView from './empty-view';

var EmailChannel = Radio.channel('email');

var NotificationEmailsView = CompositeView.extend({
	className: 'view-notification-emails',
	template: tpl,

  behaviors: {UseCSS: {style}},

  emptyView: EmptyView,
	childView: ChildView,
	childViewContainer: '.list-wrapper ul.emails-list',
	collection: new Collection(),

	initialize(options){
		this.collection.fetch();
		this.listenTo(EmailChannel, 'item:selected', this.updateList);
	},

	updateList(selected){
		this.children
			.filter(  k => k.$el.hasClass('is-active') > -1 )
			.forEach( k => k.$el.removeClass('is-active'))

		this.children
			.findByModel(selected)
			.$el.addClass('is-active')
	}

})

export default NotificationEmailsView;