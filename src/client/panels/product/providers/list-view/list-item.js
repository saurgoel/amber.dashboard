import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';

import {_Notification} from 'channels';

import tpl from './template-item.jade';

var ProvidersListItemView = ItemView.extend({
  template: tpl,
  tagName: 'li',
  ui: {
    item: '.item-inner'
  },
  events: {
    'click @ui.item': 'selectItem'
  },
  selectItem(){
    _Notification.trigger('provider:selected', this.model)
  }

});

export default ProvidersListItemView;