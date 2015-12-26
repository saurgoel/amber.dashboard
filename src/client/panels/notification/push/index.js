import {ItemView} from 'marionette';


class PushNotificationView extends ItemView {
  constructor(options){
    super(options);
    this.template = _.template('<h2> Yououa </h2>');
  }
}

export default PushNotificationView;