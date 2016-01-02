// Automatically added to head
require('font-awesome');
require('animate.css');

// Expose these
window._ = require('underscore');
window.$ = window.jQuery = require('jquery');

// Load libs
var Backbone = require('backbone');
var Marionette = require('marionette');
var Radio = require('radio');


// Overrides
(function(){
  if (__DEV__)
    Radio.DEBUG = true;
  if ( window.__agent && !_.has(window.__agent, 'patchedApp') )
    __agent.start(Backbone, Marionette);

  window.Behaviors = {};
  Marionette.Behaviors.behaviorsLookup = ()=> window.Behaviors;
})();



// App Start
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