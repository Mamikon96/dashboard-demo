import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from '../../alert/services/alert.service';
import { AlertsStoreService } from '../../alert/services/alerts-store.service';
import { Notification } from '../../notifications/models/notification.model';
import { StoreTypeService } from '../../users/services/store-type.service';

interface MenuItemOperation {
	id: string;
	value: string;
}

interface MenuItemOperations {
	[key: string]: MenuItemOperation[];
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

	@Input() title?: string;

	public selectedValue: string = '';
	public menuItems: string[] = ['Store'];
	public menuItemsOperations: MenuItemOperations = {
		'Store': [
			{ id: 'database', value: 'Database' },
			{ id: 'localstorage', value: 'Local Storage' }
		]
	};
	public isShownDropdown: boolean = false;
	public isShownNotifications: boolean = false;
	public alerts: Alert[] = [];
	public notifications: Notification[] = [];
	// [	
	// 	{ type: 'success', text: 'Success Text'},
	// 	{ type: 'warning', text: 'Warning Text'},
	// 	{ type: 'danger', text: 'Danger Text'}
	// ];

	private store: 'database' | 'localStorage' = 'database';

	constructor(private storeTypeService: StoreTypeService,
				public alertsStore: AlertsStoreService) { }

	ngOnInit(): void {
		this.alertsStore.alerts$.subscribe((alerts: Alert[]) => {
			this.alerts = alerts;
			this.notifications = this.alerts.map((alert: Alert) => ({
				type: alert.type,
				text: alert.text,
				color: alert.type
			}));
		});
	}

	clickHandler(event: any, index: number): void {
		event.preventDefault();
		this.isShownDropdown = true;
	}

	selectOption(event: any): void {
		console.log(event);
		this.store = event.value;
		this.storeTypeService.setType({type: this.store});
	}

	public notificationsClickHandler(event: any): void {
		event.preventDefault();
		this.isShownNotifications = !this.isShownNotifications;
	}

	public notificationCloseHandler(event: boolean): void {
		this.isShownNotifications = !event;
	}

	public notificationsChangeHandler(notifications: Notification[]): void {
		// console.log('Notifications: ', notifications);
		// this.alertsStore.delete(notification as Alert);
		const alerts: Alert[] = [];
		notifications.forEach(n => {
			const alert: Alert = this.notificationToAlert(n);
			alerts.push(alert);
		});
		this.alertsStore.replace(alerts);
	}

	private notificationToAlert(notification: Notification): Alert {
		const alert: Alert = {
			type: notification.type as AlertType,
			text: notification.text
		};
		return alert;
	}

}
