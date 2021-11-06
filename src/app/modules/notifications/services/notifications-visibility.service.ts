import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class NotificationsVisibilityService {

	public isShownNotifications$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	showNotifications(value: boolean): void {
		this.isShownNotifications$.next(value);
	}

}