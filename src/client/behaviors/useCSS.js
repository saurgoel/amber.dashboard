import {extend} from 'underscore';
import {Behavior} from 'marionette';


/** [UseCSS Inject styles and use local css vars through templateHelpers]
*/
var UseCSS = Behavior.extend({
	defaults: {
		style: null
	},

	initialize(){
		if (!this.options.style) return;
		this.options.style.use();

		var th = _.result(this.view, 'templateHelpers');
		var locals = this.options.style.locals;
		_.isUndefined(th)
			? this.view.templateHelpers = {s:locals}
			: this.view.templateHelpers = extend({}, th, {s:locals})
	},

	onBeforeDestroy(){ 
		if (!this.options.style) return;
		this.options.style.unuse();
	}

});

export default UseCSS;