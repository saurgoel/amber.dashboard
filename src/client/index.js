import _ from 'underscore';
import $ from 'jquery';
import Radio from 'radio';
import App from './app';

// Expose these
window.$ = window.jQuery = $;
window._ = _;



// App
let app = window.Amber = new App();
Promise.resolve($.getJSON('/config'))
	.then( config => {
		Radio.reply('global', 'config', config);
		app.start(config);
	})
	.catch( err => {
		console.error('APPERROR: ', err);
	});



// HMR Fix
if (module.hot){
	module.hot.accept();
}

