import {AppRouter} from 'marionette';
import {_Global} from 'channels';

const appRoutes = {

  '': 'home',
  'dashboard': 'dashboard',

  // Customer Panel
  'customer': 'customer',
  'customer/leads': 'customerLeads',
  'customer/users': 'customerUsers',
  'customer/beta' : 'customerBeta',

  'notification'                : 'notification',

  // Emails
  'notification/email'          : 'notificationEmailList',
  'notification/email/:id'      : 'notificationEmailShow',
  'notification/email/:id/edit' : 'notificationEmailEdit',

  // SMS
  'notification/sms'          : 'notificationSMSList',
  'notification/sms/:id'      : 'notificationSMSShow',
  'notification/sms/:id/edit' : 'notificationSMSEdit',

  // Push Notifications
  'notification/push'          : 'notificationPushList',
  'notification/push/:id'      : 'notificationPushShow',
  'notification/push/:id/edit' : 'notificationPushEdit',

  // ---- PRODUCTS PANEL ----
  'product': 'product',
  'product/providers'          : 'productProvider',
  'product/providers/:id'      : 'productProviderShow',
  'product/providers/:id/edit' : 'productProviderEdit',

  'product/institutions': 'productInstitutions',
  'product/services' : 'productServices',
  'product/content'  : 'productContent',
  'product/products' : 'productProducts',



  // Catch 404
  '*notfound': 'notfound'

}

class Router extends AppRouter {
  initialize(){
    this.appRoutes = appRoutes;

    this.listenTo(_Global, 'approuter:navigate', this.gotoRoute);
    _Global.reply('approuter', this);
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