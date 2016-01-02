import _ from 'underscore';
import {Behavior, CollectionView, CompositeView} from 'marionette';


/** [UseCSS Inject styles and use local css vars through templateHelpers]
*/

var UseCSS = Behavior.extend({
	defaults: {
		style: null,
		inSelf : 'self',
		inChild: 'self-child',
	},

	initialize(){
		if (!this.options.style && _.isFunction(this.options.style))
			return;

		this.options.style.use();
		this.parseLocals(this.options.style.use());
		this.injectHelpers(this.view, this.locals);
		this.injectClassName(this.view, this.inSelf);

		if( !(
			(this.view instanceof CollectionView) ||
			(this.view instanceof CompositeView)
		)) return

		this.listenTo(this.view, 'before:add:child', this.handleChildInjection)

	},

	parseLocals({locals = {}}){
		this.inSelf  = locals[this.options.inSelf]  || '';
		this.inChild = locals[this.options.inChild] || '';

		// Omit self classes and inject rest
		this.locals  = _.omit(locals, this.options.inSelf, this.options.inChild);
	},

	handleChildInjection(childView){
		this.injectHelpers(childView , this.locals);
		this.injectClassName(childView, this.inChild);
	},


	injectHelpers(view, locals){
		var th = _.result(view, 'templateHelpers');
		_.isUndefined(th)
			? view.templateHelpers = {s:locals}
			: view.templateHelpers = _.extend({}, th, {s:locals});
	},


	injectClassName(view, klass){
		view.className = this.extendStr(view.className, klass);
		if (_.isElement(view.el))
			view.el.className = this.extendStr(view.el.className, klass);
	},


	extendStr(str, value){
		return _.isString(str) && _.isString(value) ? `${str} ${value}` : value;
	},


	onBeforeDestroy(){
		if (!this.options.style) return;
		this.options.style.unuse();
	}

});

window.Behaviors.UseCSS = UseCSS;
export default UseCSS;