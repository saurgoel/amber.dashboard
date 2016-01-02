import {CompositeView} from 'marionette';
import {UseCSS} from 'behaviors';
import {_Notification} from 'channels';

import tpl from './template.jade';
import style from './style.styl';

import ListItem from './list-item';
import Collection from './collection';
import Model from './model';

var ProvidersListView = CompositeView.extend({

  template: tpl,
  behaviors: {UseCSS: {style}},

  childView: ListItem,
  childViewContainer: 'ul.providers-list',
  collection: new Collection,
  model: new Model,

  ui: {
    filter: '.tab.filter',
    list: 'ul.providers-list'
  },

  events: {
    'click @ui.filter': 'selectFilter'
  },

  initialize(options){
    this.initial_id = options.id ? parseInt(options.id): null;

    this.listenTo(this.collection, 'sync', this.onCollectionSync);
    this.listenTo(_Notification, 'provider:selected', this.setItemActive);

    this.collection.fetch();
  },

  onCollectionSync(){
    if (!this.initial_id)
      return
    var model = this.collection.findWhere({id: this.initial_id})

    _Notification.trigger('provider:selected', model);
    this.scrollToModel(model);
  },


  setItemActive(model){
    Backbone.history.navigate('product/providers/' + model.id)
    this.children.each(function(view){
      view.$el.toggleClass('is-active', model.id === view.model.id)
    });
  },

  scrollToModel(model){
    var view = this.children.findByModel(model);
    this.ui.list.animate({
      scrollTop: view.el.offsetTop
    }, 300);
  },

  selectFilter(e){
    let $el = $(e.currentTarget);
    this.$(this.ui.filter.selector).each(function(){
      $(this).toggleClass('is-active', $(this).is($el))
    })
  }

})

export default ProvidersListView;
