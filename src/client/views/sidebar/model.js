import {Model} from 'backbone';

const menus = [
	{name: 'Home',   route: '/',   icon: 'home' },
	{name: 'Dashboard',  route: '/dashboard',  icon: 'dashboard' },
	{name: 'Customer',   route: '/customer',   icon: 'users' },
	{name: 'Product' ,   route: '/product' ,   icon: 'product-hunt'},
	{name: 'Notification', route: '/notification', icon: 'bell'},
	{name: 'Location',   route: '/location',   icon: 'map-marker'},
	{name: 'Images'  ,   route: '/images'  ,   icon: 'picture-o'},
	{name: 'Client'  ,   route: '/client'  ,   icon: 'black-tie'},
]

class SidebarModel extends Model {
	initialize(){
		this.set({menus, selected: 0});
	}
	selectMenu(options){
		// Deactivate previous
		let prev   = _.findWhere(this.get('menus'), {active: true})
		let next = _.findWhere(this.get('menus'), options);
		if (prev) prev.active = false;
		next.active = true;
	}
}

export default SidebarModel;