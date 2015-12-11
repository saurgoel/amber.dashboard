import {extend} from 'underscore';
import UseCSS from '../behaviors/useCSS';

/**
 * [useCSS es7 decorator tp add and remove styles for a view]
 * @param  {[object]} style [This is your import from `import style from 'style'`]
 * @return {[descriptor]}       [The class descriptor on which this used.]
 */
export function useCSS(style){
	return function(view){
		// Add to behaviors
		var bhs = _.result(view.prototype, 'behaviors') || null;
		_.isUndefined(bhs)
			? bhs = {UseCSS: {style}}
			: view.prototype.behaviors = extend({}, bhs, {UseCSS: {style}}

		// Export locals in view's templateHelpers
		let ths = _.result(view.prototype, 'templateHelpers') || null;
		_.isUndefined(th)
			? ths = ()=> {locals: style.locals}
			: view.prototype.templateHelpers = ()=> extend({}, ths, {locals: style.locals})
		
		return view
	}
}