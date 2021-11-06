import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AlertsVisibilityService {

	public isShownAlerts$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	showAlerts(value: boolean): void {
		this.isShownAlerts$.next(value);
	}
	
}