import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	private isShownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isShown$: Observable<boolean> = this.isShownSubject.asObservable();

	public show(): void {
		setTimeout(() => {
			this.isShownSubject.next(true);
		}, 0);
	}

	public hide(): void {
		setTimeout(() => {
			this.isShownSubject.next(false);
		}, 0);
	}
}