import _ from 'underscore';
import {ItemView, CompositeView} from 'marionette';
import {Radio} from 'radio';


// Default ChildView
var itemTpl = _.template('<h4> <%= name %>');
var ListViewItem = ItemView.extend({
  template: itemTpl
});


var ListView = CompositeView.extend({

  childView: ListViewItem,
  childViewContainer: '.list-container',

  initialize(){
    this.listenTo(this.collection, 'request', this._onCollectionRequest);
    this.listenTo(this.collection, 'sync', this._onCollectionSync);
  },

  _onCollectionRequest(){
    Radio.trigger('global', 'loader:start');
  }
  _onCollectionSync(){
    Radio.trigger('global', 'loader:stop');
  }

});

export default ListView;