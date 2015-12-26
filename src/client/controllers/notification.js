
class NotificationController {
  index(region, {id, mode, action}){
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

  // Emails
  listAllEmail(region){
    this.index(region, {mode: 'email', action: 'list'});
  }
  editOneEmail(region, id){
    this.index(region, {id, mode: 'email', action: 'edit'});
  }
  showOneEmail(region, id){
    this.index(region, {id, mode: 'email', action: 'show'});
  }

  // Push
  listAllPush(region){
    this.index(region, {mode: 'push', action: 'list'});
  }
  editOnePush(region){
    this.index(region, {mode: 'push', action: 'edit'});
  }
  showOnePush(region){
    this.index(region, {mode: 'push', action: 'show'});
  }

  // SMS
  listAllSMS(region){
    this.index(region, {mode: 'sms', action: 'list'});
  }
  editOneSMS(region){
    this.index(region, {mode: 'sms', action: 'edit'});
  }
  showOneSMS(region){
    this.index(region, {mode: 'sms', action: 'show'});
  }

}


export default new NotificationController();