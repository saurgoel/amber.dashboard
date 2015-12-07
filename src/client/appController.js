import {Controller} from 'marionette';

import Header from './views/header/index';
import Sidebar from './views/sidebar/index';

class AppController extends Controller {
	initialize(){
		this.RM = Radio.request('global', 'root');
		
		// Load Defaults
		this.RM.get('Header').show(new Header())
		this.RM.get('Sidebar').show(new Sidebar())
	}

	// These will be executed when 
	// corresponding route in approuter is active.
	// Load these in 'Content' Region
	home(){
		require.ensure([], ()=>{
			var view = require('./views/home/index');
			this.RM.get('Content').show(new view());
		});
	}
	dashboard(){
		require.ensure([], ()=>{
			var view = require('./views/dashboard/index');
			this.RM.get('Content').show(new view());
		});
	}


	// Customers Panel
	customer(){
		require.ensure([], ()=>{
			var view = require(`./panels/customer/index`);
			this.RM.get('Content').show(new view());
		})
	}

	customerLeads(){
		require.ensure([], ()=>{
			var view = require(`./panels/customer/leads/index`);
			this.RM.get('Content').show(new view());
		})
	}

	customerUsers(){

	}
	
	customerBeta(){
		
	}

}

export default AppController;