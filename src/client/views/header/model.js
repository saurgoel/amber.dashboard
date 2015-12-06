import {Model} from 'backbone';

const panelsList = [
	{name: 'Home',   route: '#/',   icon: 'home' },
	{name: 'Dashboard',  route: '#/dashboard',  icon: 'dashboard' },
	{name: 'Customer',   route: '#/customer',   icon: 'users' },
	{name: 'Product' ,   route: '#/product' ,   icon: 'product-hunt'},
	{name: 'Location',   route: '#/location',   icon: 'map-marker'},
	{name: 'Images'  ,   route: '#/images'  ,   icon: 'picture-o'},
	{name: 'Client'  ,   route: '#/client'  ,   icon: 'black-tie'},
	{name: 'Notification', route: '#/notification', icon: 'bell'}
]

class HeaderModel extends Model {
	initialize(){
		this.set('panelsList', panelsList);
		this.set('selectedService', 'service');
	}	
}

export default HeaderModel;