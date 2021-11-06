import { Injectable } from "@angular/core";
import { Alert } from "./alert.service";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable()
export class AlertsStoreService {

	private alerts: Alert[] = [];

	private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
	public alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();


	public add(alert: Alert): void {
		this.alerts.push(alert);
		this.updateSubject();
	}

	public delete(alert: Alert): void {
		this.alerts = this.alerts.filter(alert => alert !== alert);
		this.updateSubject();
	}

	public clear(): void {
		this.alerts = [];
		this.updateSubject();
	}

	public replace(alerts: Alert[]): void {
		this.alerts = alerts;
		this.updateSubject();
	}

	private updateSubject(): void {
		this.alertsSubject.next(this.alerts);
	}
}