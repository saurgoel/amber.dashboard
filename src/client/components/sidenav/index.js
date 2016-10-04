import {ItemView, CollectionView} from 'marionette';

import tpl from './template.jade';
import tplItem from './template-item.jade';

let NavItem = ItemView.extend({
	template: tplItem,
	tagName: 'li'
});

const SideNavView = CollectionView.extend({
	template: tpl,
	tagName: 'nav',
	childView: NavItem,
});

export default SideNavView;