import _ from 'underscore';
import $ from 'jquery';
import 'velocity-animate/velocity.min';

import Radio from 'radio';
import App from './app';


// Expose these
window.$ = window.jQuery = $;
window._ = _;



function start(config){
	Radio.reply('global', 'config', config);
	app.start(config);
}




// App
window.app = new App();

Promise
	.resolve($.getJSON('/config'))
	.then(start)
	.catch(err => console.error(err.stack) );



// HMR Fix
if (__DEV__ && module.hot){
  module.hot.accept();
}
