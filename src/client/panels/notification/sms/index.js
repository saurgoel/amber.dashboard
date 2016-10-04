import {ItemView} from 'marionette';


class SMSNotificationView extends ItemView {
  constructor(options){
    super(options);
    this.template = _.template('<h2> Youou SMSa </h2>');
  }
}

export default SMSNotificationView;