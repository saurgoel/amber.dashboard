import {CompositeView} from 'marionette';
import {WithCSS, ProtoProp} from 'utils';

import tpl from './template-list.jade';
import style from './style.styl';

import Collection from './collection';
import ChildView from './list-view-item';
import EmptyView from './empty-view';

@WithCSS(style)
@ProtoProp({
  className: 'view-notification-emails',
  collection: new Collection(),
})
class NotificationEmailsView extends CompositeView {
  template = tpl
  emptyView = EmptyView
  childView = ChildView
  childViewContainer = '.list-wrapper ul.emails-list'

  initialize(options){
    this.collection.fetch();
    console.log('notification/emails/.', options)
  }

}

// var NotificationEmailsView = CompositeView.extend({
// 	className: 'view-notification-emails',
// 	template: tpl,

// 	childView: ChildView,
// 	childViewContainer: '.list-wrapper ul.emails-list',
// 	collection: new Collection(),

// 	initialize(options){
// 		this.collection.fetch();
// 		console.log('notification/emails/.', options)
// 	},

// })

export default NotificationEmailsView;