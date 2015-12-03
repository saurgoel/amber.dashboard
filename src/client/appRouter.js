import Marionette from 'marionette';

const appRoutes = {
	'(/)': 'home',
	'dashboard': 'dashboard'
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