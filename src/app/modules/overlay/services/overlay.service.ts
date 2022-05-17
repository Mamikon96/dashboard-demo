import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {

    private showOverlaySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showOverlay$: Observable<boolean> = this.showOverlaySubject.asObservable();

    public showOverlay(showOverlay: boolean): void {
        this.showOverlaySubject.next(showOverlay);
    }
}
