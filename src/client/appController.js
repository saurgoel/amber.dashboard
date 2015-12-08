import {Controller} from 'marionette';

import HeaderView   from './views/header/index';
import SidebarView  from './views/sidebar/index';
import NotFoundView from './views/notfound/index';

class AppController extends Controller {
	initialize(){
		this.RM = Radio.request('global', 'root');
		
		// Load Defaults
		this.RM.get('Header').show(new HeaderView())
		this.RM.get('Sidebar').show(new SidebarView())
	}

	// Inject views in content region
	toContent(view, options){
		let ops = options || {};
		let _view = new view(ops);
		this.RM.get('Content').show(_view);
	}

	// When none of our route matches
	notfound(){
		console.error('404: Not Found');
		this.toContent(NotFoundView);
	}

	home(){
		require.ensure([], ()=>{
			var view = require('./views/home/index');
			this.toContent(view);
		});
	}
	dashboard(){
		require.ensure([], ()=>{
			var view = require('./views/dashboard/index');
			this.toContent(view);
		});
	}


	// Customers Panel
	customer(){
		require.ensure([], ()=>{
			var view = require('./panels/customer/index');
			this.toContent(view);
		})
	}

	customerLeads(){
		require.ensure([], ()=>{
			var view = require('./panels/customer/leads/index');
			this.toContent(view);
		})
	}

	customerUsers(){

	}
	
	customerBeta(){
		
	}

	notification(){
		require.ensure([], ()=>{
			var view = require('./panels/notification/index');
			this.toContent(view);
		})
	}
	notificationEmails(){}
	notificationSMS(){}
	notificationPush(){}

}

export default AppController;