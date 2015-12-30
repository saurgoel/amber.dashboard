import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

const tabslist = [
  {name: 'Stylists', url: '/product/providers'},
  {name: 'Salon & Spa', url: '/product/institutions'},
  {name: 'Products', url: '/product/products'},
  {name: 'Services', url: '/product/services'},
  {name: 'Content', url: '/product/content'},
]

var ProductServiceHeader = ItemView.extend({
  template: tpl,
  className: 'view-product-page-header',
  behaviors: {UseCSS: {style}},
  templateHelpers(){
    return {tabslist}
  },
  onRender(){
    let frag = Backbone.history.getFragment();
    this.$('.tab a').each(function(){
      $(this).parent().toggleClass('is-active', $(this).attr('href') === `/${frag}`)
    });
  }
});

export default ProductServiceHeader;