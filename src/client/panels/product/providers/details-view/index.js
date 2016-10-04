import {Model} from 'backbone';
import {ItemView} from 'marionette';
import {UseCSS} from 'behaviors';
import {_Global, _Notification} from 'channels';

import tpl from './template.jade';
import style from './style.styl';

const config = _Global.request('config');

var ProviderDetailsView = ItemView.extend({
  template: tpl,
  behaviors: {UseCSS: {style}},
  model: new Model,

  initialize({id, mode}){
    // mode is 'show' or 'edit'
    this.model.set({mode});
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(_Notification, 'provider:selected', this.update);
  },

  update(model){
    this.model.set(model.toJSON());
  }
});

export default ProviderDetailsView;