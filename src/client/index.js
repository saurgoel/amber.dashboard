import _ from 'underscore';
import $ from 'jquery';
import Radio from 'radio';
import App from './app';



// Expose these
window.$ = window.jQuery = $;
window._ = _;



let app = window.Amber = new App();
// Start after fetching config
Promise.resolve($.getJSON('/config'))
	.then( config => {
		Radio.reply('global', 'config');
		app.start(config);
	})
	.catch( console.error.bind(console, 'ERROR:\n') )


if (module.hot){
	module.hot.accept();
}

