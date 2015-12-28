import _ from 'underscore';
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
			: this.view.templateHelpers = _.extend({}, th, {s:locals});

		// Export of .self
		// directly to this.el element
		// or extend this.className otherwise
		let self_export = _.has(locals, 'self') ? locals.self : '';
		this.view.isRendered
			? this.view.el.className += ` ${self_export}`
			: this.view.className += ` ${self_export}`;
	},

	onBeforeDestroy(){
		if (!this.options.style) return;
		this.options.style.unuse();
	}

});

window.Behaviors.UseCSS = UseCSS;
export default UseCSS;