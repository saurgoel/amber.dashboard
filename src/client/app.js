import {Application} from 'marionette';
import Radio from 'radio';

import AppController from './appController';
import AppRouter from './appRouter';

class App extends Application{

	onBeforeStart(){
		this.setupBehaviors();
		this.ajaxConfig();
		this.initRouter();

		// Disable when using pushState
		this.handleHref();
	}	

	ajaxConfig(){
		let counter = 0;
		$.ajaxSetup({
			crossdomain: true,
			beforeStart: ()=> {
				Radio.trigger('global', 'loader:start');
				i++;
			},
			complete: ()=>{
				i--;
				if (i<1) Radio.trigger('global', 'loader:stop');
			}
		})
	}

	handleHref(){
		self = this
		
		$(document).on('click', 'a[href^="/"]', (e)=>{
			let href = $(e.currentTarget).attr('href')
			let passThrough = self.hrefWhiteList.indexOf(href) !== -1

			// Allow shift+click for new tabs, etc.
			if (!passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey){
				e.preventDefault() 
			}

			// Remove leading slashes and hash bangs (backward compatablility)
			let url = href.replace(/^\//  , '').replace('\#\!\/', '')

			self.Router.navigate(url, {trigger: true})
			Radio.trigger('global', 'approute:navigate', url)

			return false
		})
	}

	setupBehaviors(){
		window.Behaviors = {};
		Marionette.Behaviors.behaviorsLookup = ()=> window.Behaviors;
		Radio.reply('global', 'approuter', this.Router);
	}

	initRouter(){
		this.Router = new AppRouter({controller: new AppController()})
	}

	onStart(){
		if (!Backbone.History.started){
			Backbone.history.start({pushState: false, hashChange: true})
		}
		console.log('App started')
	}
}

export default App;