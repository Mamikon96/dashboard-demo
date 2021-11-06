import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertsStoreService } from "./alerts-store.service";


export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
	type: AlertType;
	text: string;
}

@Injectable()
export class AlertService {

	public alert$ = new Subject<Alert>();


	constructor(private alerts: AlertsStoreService) {}


	success(text: string): void {
		const alert: Alert = {type: 'success', text};
		this.alert$.next(alert);
		this.alerts.add(alert);
	}

	warning(text: string): void {
		const alert: Alert = {type: 'warning', text};
		this.alert$.next(alert);
		this.alerts.add(alert);
	}

	danger(text: string): void {
		const alert: Alert = {type: 'danger', text};
		this.alert$.next(alert);
		this.alerts.add(alert);
	}
}