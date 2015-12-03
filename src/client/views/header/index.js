import {ItemView} from 'marionette';
import tpl from './template.jade';

import style from './style.styl';

class HeaderView extends ItemView {
	template  = tpl;
	className = 'view-header' 
}

export default HeaderView;