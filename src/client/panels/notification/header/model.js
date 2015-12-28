import {Model} from 'backbone';

var NotificationHeaderModel = Model.extend({
  defaults: {
    selected: 0,
    tabs: [
      { name: 'Email', url: 'notification/email'},
      { name: 'SMS'  , url: 'notification/sms' },
      { name: 'Push' , url: 'notification/push'},
    ]
  }

})

export default NotificationHeaderModel;