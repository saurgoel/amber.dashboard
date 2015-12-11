import {Behavior} from 'marionette';

var UseCSS = Behavior.extend({
	defaults: {
		style: null
	},
	
	onBeforeRender(){
		this.options.style ? this.options.style.use() : return;
	}

	onBeforeDestroy(){ 
		this.options.style.unuse();
	}

});


window.Behavior.UseCSS = UseCSS;
export default UseCSS;