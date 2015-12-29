
// Expose these
window.$ = window.jQuery = require('jquery');
window._ = require('underscore');

// Inject into head
// require('style/url!file!font-awesome/css/font-awesome.min.css');
// require('style/url!file!animate.css/animate.min.css');


var Backbone = require('backbone');
var Marionette = require('marionette');
var Radio = require('radio');


(function(){
  if (__DEV__)
    Radio.DEBUG = true;
  if ( window.__agent && !_.has(window.__agent, 'patchedApp') )
    __agent.start(Backbone, Marionette);

  window.Behaviors = {};
  Marionette.Behaviors.behaviorsLookup = ()=> window.Behaviors;
})();

function start(config){
  Radio.reply('global', 'config', config);
  app.start(config);
}

// App
var Application = require('./app');

window.app = new Application();
Promise
  .resolve($.getJSON('/config'))
  .then(start)
  .catch(err => console.error(err.stack) );