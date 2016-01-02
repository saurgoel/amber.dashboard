import {LayoutView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

import HeaderView from './header/index';

var ProductPageLayout = LayoutView.extend({
  template: tpl,
  className: 'layout-product-page',

  behaviors: {UseCSS: {style}},
  regions: {
    Header: '.region-header',
    Content: '.region-content'
  },

  initialize({subpanel}){
    this.subpanel = subpanel;
    Radio.trigger('header', 'update:sub-title', 'Product', '/product');
  },

  onAttach(){
    this.headerView = new HeaderView();
    this.Header.show( this.headerView );
    if (this.subpanel)
      this.Content.show(this.subpanel)
  }

});

export default ProductPageLayout;