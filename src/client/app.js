import {Application, RegionManager} from 'marionette';
import Radio from 'radio';

import Materialize from 'materialize-css';

import AppController from './appController';
import AppRouter from './appRouter';

import style from './app.styl';


const regions = {
	Header : '#app-header',
	Sidebar: '#app-sidebar',
	Content: '#app-content'
}

class App extends Application{
	initialize(){
		this.rootView = new RegionManager({el: '#root', regions});
		Radio.reply('global', 'root', this.rootView);

		style.use();
		this.listenTo(this, 'destroy', style.unuse);
	}

	onBeforeStart(){
		this.setupBehaviors();
		this.ajaxConfig();
		this.handleHref();
		this.initRouter();
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

	setupBehaviors(){
		window.Behaviors = {};
		Marionette.Behaviors.behaviorsLookup = ()=> window.Behaviors;
	}

	initRouter(){
		this.Router = new AppRouter({controller: new AppController()})
	}

	handleHref(){
		$(document).on('click', 'a[href^="/"]', (e)=>{
			let $target = $(e.currentTarget)
			let href = $target.attr('href')
			
			// <a href='/some/route' data-pass=true>
			if ($target.data('pass')) return;

			// chain 'or's for other black list routes
			let passThrough = href.indexOf('sign_out') >= 0

			// Allow shift+click for new tabs, etc.
			if( !passThrough && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey){
				e.preventDefault()
			}

			// Remove leading slashes and hash bangs (backward compatablility)
			let url = href.replace(/^\//  , '').replace('\#\!\/', '');
			// Instruct Backbone to trigger routing events
			this.Router.navigate(url, {trigger: true})
			return false
		});
	}

	onStart(){
		if (!Backbone.History.started){
			Backbone.history.start({pushState: true, hashChange: false})
		}
		console.log('App started')
	}
}

export default App;