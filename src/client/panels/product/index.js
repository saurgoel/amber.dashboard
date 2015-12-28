import {Model, Collection} from 'backbone';

import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';


var model = new Model({title: 'Product'})
var collection = new Collection([
  {name:'x'},
  {name:'y'},
  {name:'z'}
]);


var ProductPage = ItemView.extend({
  template: tpl,
  behaviors: {UseCSS: {style}},
  modelEvents: {
    change: 'render'
  },

  model: model,
  initialize(){
    window.aa = this;
    Radio.trigger('header', 'update:sub-title', 'Product', '/product');
  }
});

export default ProductPage;