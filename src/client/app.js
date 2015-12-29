import {Application, RegionManager} from 'marionette';
// import Materialize from 'materialize-css';
import {Global} from 'channels';

import AppController from './appController';
import AppRouter from './appRouter';

import style from './app.styl';

const regions = {
	Header : '#app-header',
	Sidebar: '#app-sidebar',
	Content: '#app-content'
}

class App extends Application {
	initialize(){
		this.rootView = new RegionManager({el: '#root', regions});
		Global.reply('root', this.rootView);

		style.use();
		this.listenTo(this, 'destroy', style.unuse);
	}

	onBeforeStart(){

		this.ajaxConfig();
		this.handleHref();
		this.initRouter();
	}

	onStart(){
		if (!Backbone.History.started){
			Backbone.history.start({pushState: true, hashChange: false})
		}
		console.log('App started')
	}

	ajaxConfig(){
		let counter = 0;
		$.ajaxSetup({
			crossdomain: true,
			xhrFields: { withCredentials: true },
			beforeStart: ()=> {
				Radio.trigger('global', 'loader:start');
				counter++;
			},
			complete: ()=>{
				counter--;
				if (counter<1) Radio.trigger('global', 'loader:stop');
			}
		})
	}

	initRouter(){
		this.Router = new AppRouter({
			controller: new AppController(this.rootView)
		});
	}

	handleHref(){
		// Urls that can be rendered by server without loading app
		const blacklist = ['sign_out']

		$(document).on('click', 'a[href^="/"]', (e)=>{
			let $a = $(e.currentTarget)
			let href = $a.attr('href')

			// <a href='/some/route' data-pass=true>
			if ($a.data('pass')) return;

			// allow if not present in blacklist
			let passThrough = !blacklist.includes(href);

			// Allow shift+click for new tabs, etc.
			if( !passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey){
				e.preventDefault()
			}

			// Remove leading slashes and hash bangs (backward compatablility)
			let url = href.replace(/^\//  , '').replace('\#\!\/', '');

			// Navigate through router
			this.Router.navigate(url, {trigger: true})
			return false
		});
	}

}


// HMR Fix
if (__DEV__ && module.hot){
  module.hot.accept();
}


export default App;