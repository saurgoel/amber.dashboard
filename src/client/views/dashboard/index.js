import {ItemView} from 'marionette';

import tpl from './template.jade';
import style from './style.styl';

import {useCSS} from '../../utils';

@useCSS(style)
class DashboardPage extends ItemView {
	template  = tpl
	className = 'view-dashboard-page'
}

export default DashboardPage;