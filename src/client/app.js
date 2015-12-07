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
		this.initRouter();
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
	}

	onStart(){
		if (!Backbone.History.started){
			Backbone.history.start({pushState: true, hashChange: false})
		}
		console.log('App started')
	}
}

export default App;