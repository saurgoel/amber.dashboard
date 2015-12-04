import _ from 'underscore';
import $ from 'jquery';
import App from './app';

// Expose these
window.$ = $;
window._ = _;




// Start our app
let app = window.Amber = new App();
app.start();


if (module.hot){
	module.hot.accept();
}