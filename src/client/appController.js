import {Controller, RegionManager} from 'marionette';

import Header from './views/header/index';
import Sidebar from './views/sidebar/index';

// The elements are rendered through server in base page
const regions = {
	Header: '#app-header',
	Sidebar: '#app-sidebar',
	Content: '#app-content'
}

// Region Manager
const Manager = new RegionManager({regions, el: '#root'});

class AppController extends Controller {
	initialize(){
		
		// Load Defaults
		Manager.get('Header').show(new Header())
		Manager.get('Sidebar').show(new Sidebar())
	}

	// These will be executed when 
	// corresponding route in approuter is active.
	// Load these in 'Content' Region
	home(){
		require.ensure([], ()=>{
			var view = require('./views/home/index').default;
			Manager.get('Content').show(new view());
		});
	}
	dashboard(){
		require.ensure([], ()=>{
			var view = require('./views/dashboard/index').default;
			Manager.get('Content').show(new view());
		});
	}

}

export default AppController;