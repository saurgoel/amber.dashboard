import {LayoutView} from 'marionette';
import {UseCSS} from 'behaviors';

import tpl from './template.jade';
import style from './style.styl';

import ListView    from './list-view/index';
import DetailsView from './details-view/index';



var ProductProvidersView = LayoutView.extend({
  template: tpl,
  className: 'view-product-providers',
  behaviors: {UseCSS:{style} },

  regions: {
    List: '.region-list',
    Details: '.region-details'
  },

  initialize(options){
    this.listview = new ListView(options);
    this.detailsview = new DetailsView(options);
    console.log('Prodivers: ', options)
  },

  onAttach(){
    this.List.show(this.listview);
    this.Details.show(this.detailsview);
  }

})
export default ProductProvidersView;