import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
	declarations: [
		NotificationsListComponent,
		NotificationComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		NotificationsListComponent,
		NotificationComponent
	]
})
export class NotificationsModule { }
