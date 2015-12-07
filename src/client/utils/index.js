import Marionette from 'marionette';
import merge from 'lodash/object/merge';

// Auto-Inject styles with classes
export function useCSS(style){
	let loaded = {};

	class UseCSS extends Marionette.Behavior {
		onRender(){ style.use(); }
		onDestroy(){ style.unuse(); }
	}

	merge(
		Marionette._getValue(Marionette.Behaviors.behaviorsLookup),
		{UseCSS}
	);

	return function(klass){
		if (!klass.prototype.behaviors)
			klass.prototype.behaviors = {};
		merge(klass.prototype.behaviors, { UseCSS: {} })
		return klass;
	}
}