import {ItemView} from 'marionette';

var tpl = '';
tpl+= '<h4 class="empty-view-loading"> Loading Templates... </h4>'

class EmptyView extends ItemView {
  template = _.template(tpl)
}

export default EmptyView;