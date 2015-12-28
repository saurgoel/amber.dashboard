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

	product(){
		require.ensure([], ()=>{
			var view = require('./panels/product/index');
			this.toContent(view);
		})
	}

	// Notifications Panel
	notification(){
		NotificationController.index(this.Content, {});
	}

	// Emails
	notificationEmailList(){
		NotificationController.listAllEmail(this.Content);
	}
	notificationEmailShow(id){
		NotificationController.showOneEmail(this.Content, id);
	}
	notificationEmailEdit(id){
		NotificationController.editOneEmail(this.Content, id);
	}

	// SMS
	notificationSMSList(){
		NotificationController.listAllSMS(this.Content);
	}
	notificationSMSShow(id){
		NotificationController.showOneSMS(this.Content, id);
	}
	notificationSMSEdit(id){
		NotificationController.editOneSMS(this.Content, id);
	}

	// Push
	notificationPushList(){
		NotificationController.listAllPush(this.Content);
	}
	notificationPushShow(id){
		NotificationController.showOnePush(this.Content, id);
	}
	notificationPushEdit(id){
		NotificationController.editOnePush(this.Content, id);
	}


}

export default AppController;