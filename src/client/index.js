
// Expose these
window.$ = window.jQuery = require('jquery');
window._ = require('underscore');

var Backbone = require('backbone');
var Marionette = require('marionette');
var Radio = require('radio');

// IIFE
(function(){
  if (__DEV__) {
    Radio.DEBUG = true;
    if (window.__agent && !window.__agent.patchedApp)
      __agent.start(Backbone, Marionette);
  }

  window.Behaviors = {};
  Marionette.Behaviors.behaviorsLookup = ()=> window.Behaviors;
})();



function start(config){
  Radio.reply('global', 'config', config);
  app.start(config);
}

// App
let Application = require('./app');
window.app = new Application();
Promise
  .resolve($.getJSON('/config'))
  .then(start)
  .catch(err => console.error(err.stack) );



// HMR Fix
if (__DEV__ && module.hot){
  module.hot.accept();
}
