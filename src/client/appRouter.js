import Marionette from 'marionette';

const appRoutes = {
	
	'': 'home',
	'dashboard': 'dashboard',
	
	// Customer Panel
	'customer': 'customer',
	'customer/leads': 'customerLeads',
	'customer/users': 'customerUsers',
	'customer/beta' : 'customerBeta',


	'notification': 'notification',
	'notification/emails': 'notificationEmails',
	'notification/sms': 'notificationSMS',
	'notification/push': 'notificationPush',

}

let Global = Radio.channel('global');

class AppRouter extends Marionette.AppRouter {
	initialize(){
		this.appRoutes = appRoutes;
		this.listenTo(Global, 'approuter:navigate', this.gotoRoute);
		Global.reply('approuter', this);
	}

	gotoRoute(route){
		this.navigate(route, {trigger: true});
	}
	
	// Called on every route navigation
	onRoute(name, path, options){
		console.log('AppRouter Navigate: ', name, path, options);
	}
}

export default AppRouter;