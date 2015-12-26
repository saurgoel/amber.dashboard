import {AppRouter} from 'marionette';
import {Global} from 'channels';

const appRoutes = {

  '': 'home',
  'dashboard': 'dashboard',

  // Customer Panel
  'customer': 'customer',
  'customer/leads': 'customerLeads',
  'customer/users': 'customerUsers',
  'customer/beta' : 'customerBeta',

  // Matches
  // /notification, /notification/foo
  'notification'                : 'notification',
  'notification/email'          : 'notificationEmailList',
  'notification/email/:id'      : 'notificationEmailShow',
  'notification/email/:id/edit' : 'notificationEmailEdit',

  'notification/sms' : 'notificationSMSList',
  'notification/push': 'notificationPushList',

  'notification/*notfound': 'notfound',

  '*notfound': 'notfound'

}

class Router extends AppRouter {
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

export default Router;