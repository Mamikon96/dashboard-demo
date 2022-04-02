import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { AlertsVisibilityService } from '../alert/services/alerts-visibility.service';
import { Subscription } from 'rxjs';
import { NotificationsVisibilityService } from '../notifications/services/notifications-visibility.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit, OnDestroy {

	public isAlertEnabled: boolean = true;
	public isNotificationEnabled: boolean = true;

	private alertsSub!: Subscription;


	constructor(private alertsVisibility: AlertsVisibilityService,
				private notificationsVisibility: NotificationsVisibilityService) { }

	ngOnInit(): void {
		this.alertsSub = this.alertsVisibility.isShownAlerts$
			.subscribe((isShown: boolean) => {
				this.isAlertEnabled = isShown;
			});
	}

	ngOnDestroy(): void {
		this.alertsSub && this.alertsSub.unsubscribe();
	}


	enableAlertHandler(event: MatSlideToggleChange): void {
		// this.isChecked = event.checked;
		this.alertsVisibility.showAlerts(event.checked);
	}

	enableNotificationHandler(event: MatSlideToggleChange): void {
		// this.isChecked = event.checked;
		this.notificationsVisibility.showNotifications(event.checked);
	}

}
