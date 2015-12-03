import {ItemView} from 'marionette';
import tpl from './template.jade';

import style from './style.styl';

class HomePageView extends ItemView {
	template  = tpl;
	className = 'view-homepage';
}

export default HomePageView;