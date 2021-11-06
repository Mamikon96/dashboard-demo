import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsVisibilityService } from './services/notifications-visibility.service';



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
export class NotificationsModule {

	static forRoot(): ModuleWithProviders<NotificationsModule> {
		return {
			ngModule: NotificationsModule,
			providers: [NotificationsVisibilityService]
		};
	}
	
}
