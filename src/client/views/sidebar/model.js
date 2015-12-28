import {Model} from 'backbone';

export default new Model({
	menus: [
		{name: 'Home',   route: '/',   icon: 'home' },
		{name: 'Dashboard',  route: '/dashboard',  icon: 'dashboard' },
		{name: 'Customer',   route: '/customer',   icon: 'users' },
		{name: 'Product' ,   route: '/product' ,   icon: 'product-hunt'},
		{name: 'Notification', route: '/notification', icon: 'bell'},
		{name: 'Location',   route: '/location',   icon: 'map-marker'},
		{name: 'Images'  ,   route: '/images'  ,   icon: 'picture-o'},
		{name: 'Client'  ,   route: '/client'  ,   icon: 'black-tie'},
	]
});