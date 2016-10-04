
function NotificationController(region, {id, mode, action}){
  require.ensure([], ()=>{
    let baseView   = require('../panels/notification/index');
    let emailsView = require('../panels/notification/email/index');
    let pushView   = require('../panels/notification/push/index');
    let smsView    = require('../panels/notification/sms/index');


    let subpanel;
    switch (mode){
      case 'email':
        subpanel = new emailsView({id, action});
        break;
      case 'push':
        subpanel = new pushView({id, action});
        break;
      case 'sms':
        subpanel = new smsView({id, action});
        break;
      default:
        subpanel = null;
        break;
    }

    region.show( new baseView({subpanel}) );

  })
}

export default NotificationController;