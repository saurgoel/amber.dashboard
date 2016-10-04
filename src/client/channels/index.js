var Radio = require('radio');

const channels = {
  _Global: 'global',
  _Notification: 'notification',
  _Product: 'product'
};

Object.keys(channels).forEach(function(key){
  channels[key] = Radio.channel(channels[key]);
});

export default channels;