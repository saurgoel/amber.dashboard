import {Application} from 'marionette';
import Radio from 'radio';

import Materialize from 'materialize-css';

import AppController from './appController';
import AppRouter from './appRouter';

import style from './app.styl';

class App extends Application{
	initialize(){
		this.setupBehaviors();
		this.ajaxConfig();
		this.initRouter();

		style.use();
		this.listenTo(this, 'destroy', style.unuse);
	}

	ajaxConfig(){
		let counter = 0;
		$.ajaxSetup({
			crossdomain: true,
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
		Radio.reply('global', 'approuter', this.Router);
	}

	onStart(){
		if (!Backbone.History.started){
			Backbone.history.start({pushState: false, hashChange: true})
		}
		console.log('App started')
	}
}

export default App;