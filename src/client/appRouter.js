import Marionette from 'marionette';

const appRoutes = {
	
	'(/)': 'home',
	'dashboard': 'dashboard',
	
	// Customer Panel
	'customer': 'customer',
	'customer/leads': 'customerLeads',
	'customer/users': 'customerUsers',
	'customer/beta' : 'customerBeta',

}


class AppRouter extends Marionette.AppRouter {
	initialize(){
		this.appRoutes = appRoutes;
	}
	
	// Called on every route navigation
	onRoute(name, path, options){
		console.log('AppRouter Navigate: ', name, path, options);
	}
}

export default AppRouter;