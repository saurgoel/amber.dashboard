import {CompositeView} from 'marionette';
import {UseCSS} from 'behaviors';
import {_Notification, _Global} from 'channels';

import tpl from './template.jade';
import style from './style.styl';

import ListItem from './list-item';
import Collection from './collection';
import Model from './model';

const config = _Global.request('config');

var ProvidersListView = CompositeView.extend({

  template: tpl,
  behaviors: {UseCSS: {style}},

  childView: ListItem,
  childViewContainer: 'ul.providers-list',
  collection: new Collection,
  model: new Model,

  ui: {
    filter: '.tab.filter',
    list: 'ul.providers-list',

    metarange: '.meta-range',
    metacount: '.meta-count',

    prev: '.go-prev',
    next: '.go-next',
    search: '.search-box input',
  },

  events: {
    'click @ui.filter': 'selectFilter',
    'click @ui.next': 'paginateNext',
    'click @ui.prev': 'paginatePrev',
    'keyup @ui.search': 'filterByText'
  },

  initialize(options){
    window.aa = this;
    this.initial_id = options.id ? parseInt(options.id): null;

    this.listenTo(this.collection, 'sync', this.onCollectionSync);
    this.listenTo(this.collection, 'sync', this.updateMeta);
    this.listenTo(_Notification, 'provider:selected', this.setItemActive);

    this.collection.fetch();
  },

  filterByText(e){
    let $el = $(e.currentTarget);
    console.log('Filtering... ', $el.val())
  },

  onBeforeRender(){
    this.model
      .updateCounts()
      .then(this.updateCounts.bind(this));
  },

  paginateNext(){
    let {next, page} = this.collection.meta;
    if (!next)
      return
    let p = page+1;
    this.collection.fetch({ data: {p} });
  },
  paginatePrev(){
    let {prev, page} = this.collection.meta;
    if (!prev)
      return
    let p = page-1;
    this.collection.fetch({ data: {p} });
  },

  onCollectionSync(){
    if (!this.initial_id)
      return

    var model = this.collection.findWhere({id: this.initial_id})
    if (model){
      this.scrollToModel(model);
      _Notification.trigger('provider:selected', model);
    }
    else{
      console.log('No model in collection. id:', this.initial_id);
    }
  },

  updateMeta(){
    let {count, limit, prev, next, page} = this.collection.meta;

    let start = prev ? prev*limit : 1;
    let end   = next ? (next-1)*limit : count;

    this.ui.metarange.text(`${start} - ${end}`);
    this.ui.metacount.text(count)

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
    });
    this.collection.service = $el.attr('data-filter');
    this.collection.fetch();
  },

  updateCounts(counts){
    console.log('Updating counts...', counts);
    this.ui.filter.each(function(){
      var k = $(this).attr('data-filter');
      $(this).find('.count').text( counts[k] );
    })
  }

})

export default ProvidersListView;
