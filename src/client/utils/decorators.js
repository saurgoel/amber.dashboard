import _ from 'underscore';
import {UseCSS} from '../behaviors';

/**
 * [CSS es7 decorator tp add and remove styles for a view]
 * @param  {[object]} style [This is your import from `import style from 'style'`]
 * @return {[descriptor]}       [The class descriptor on which this used.]
 *
 * Usage:
 * import style from './style.styl';
 *
 * @WithCSS(style)
 * class Animal(){ }
 */
export function WithCSS(style){
	return function(view){
		// Add to behaviors
		var bhs = _.result(view.prototype, 'behaviors') || null;
		_.isUndefined(bhs)
			? bhs = {UseCSS: {style}}
			: view.prototype.behaviors = _.extend({}, bhs, {UseCSS: {style}});

		return view
	}
}


/**
 * [ProtoProp Add properties directly to class's prototype]
 * @param  {[string/object]} propName [Can be string/object]
 * @param  {[value]} [propVal]  [Optional if first argument is object, property value in other cases]
 * @return {[type]}          [Modified Class]
 *
 * Usage:
 *
 * // Single Usage:
 * @protoProp('className', 'some-class-name')
 * class Animal(){ }
 *
 * // Multi:
 * @protoProp({className: 'some-class-name', foo: 23, bar: 32 })
 */
export function ProtoProp(propName, propVal){
  return function(klass){
    if ( _.isString(propName) ){
      klass.prototype[propName] = propVal;
    }
    else if ( _.isObject(propName) ){
      _.extend(klass.prototype, propName)
    }
    else{
      throw new Error('Invalid usage for decorator protoProp')
    }
    return klass;
  }
}