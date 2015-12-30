import {Controller} from 'marionette';

import NotificationController from 'controllers/notification';

import HeaderView   from './views/header/index';
import SidebarView  from './views/sidebar/index';
import NotFoundView from './views/notfound/index';

class AppController extends Controller {
	initialize(root){
		this.root = root;
		this.Content = root.get('Content');

		// Load Defaults
		this.root.get('Header').show(new HeaderView())
		this.root.get('Sidebar').show(new SidebarView())
	}

	// Inject views in content region
	toContent(view, options){
		let ops = options || {};
		let _view = new view(ops);
		this.Content.show(_view);
	}

	// When none of our route matches
	notfound(){
		console.error('404: Not Found');
		this.toContent(NotFoundView);
	}

	home(){
		require.ensure([], ()=>{
			var view = require('./views/home/index');
			this.toContent(view);
		});
	}
	dashboard(){
		require.ensure([], ()=>{
			var view = require('./views/dashboard/index');
			this.toContent(view);
		});
	}


	// Customers Panel
	customer(){
		require.ensure([], ()=>{
			var view = require('./panels/customer/index');
			this.toContent(view);
		})
	}

	customerLeads(){
		require.ensure([], ()=>{
			var view = require('./panels/customer/leads/index');
			this.toContent(view);
		})
	}

	customerUsers(){

	}

	customerBeta(){

	}

	// ---------- PRODUCTS PANEL ----------
	product(){
		require.ensure([], ()=>{
			var view = require('./panels/product/index');
			this.toContent(view);
		})
	}




	// ------- NOTIFICATIONS PANEL ----------
	notification(){
		NotificationController(this.Content, {});
	}
	// Emails
	notificationEmailList(){
		NotificationController(this.Content, {mode: 'email', action: 'list'});
	}
	notificationEmailShow(id){
		NotificationController(this.Content, {id, mode: 'email', action: 'show'});
	}
	notificationEmailEdit(id){
		NotificationController(this.Content, {id, mode: 'email', action: 'edit'});
	}

	// SMS
	notificationSMSList(){
		NotificationController(this.Content, {mode: 'sms', action: 'list'});
	}
	notificationSMSShow(id){
		NotificationController(this.Content, {id, mode: 'sms', action: 'show'});
	}
	notificationSMSEdit(id){
		NotificationController(this.Content, {id, mode: 'sms', action: 'edit'});
	}

	// Push
	notificationPushList(){
		NotificationController(this.Content, {mode: 'push', action: 'list'});
	}
	notificationPushShow(id){
		NotificationController(this.Content, {id, mode: 'push', action: 'show'});
	}
	notificationPushEdit(id){
		NotificationController(this.Content, {id, mode: 'push', action: 'edit'});
	}


}

export default AppController;