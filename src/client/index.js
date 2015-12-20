import _ from 'underscore';
import $ from 'jquery';
import Radio from 'radio';
import App from './app';

// Expose these
window.$ = window.jQuery = $;
window._ = _;


const start = (config)=>{
	Radio.reply('global', 'config', config);
	app.start(config);
}


// App
window.app = new App();

Promise
	.resolve($.getJSON('/config'))
	.then(start)
	.catch(err => console.error('APPERROR: ', err, err.stack) );



// HMR Fix
if (module.hot){
	module.hot.accept();
}

