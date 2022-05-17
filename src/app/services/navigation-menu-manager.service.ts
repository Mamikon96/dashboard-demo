import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {OverlayService} from "../modules/overlay/services/overlay.service";

@Injectable({
    providedIn: "root"
})
export class NavigationMenuManagerService {

    private showNavMenuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public showNavMenu$: Observable<boolean> = this.showNavMenuSubject.asObservable();

    constructor(private overlayService: OverlayService) {
    }

    public showNavMenu(show: boolean): void {
        this.showNavMenuSubject.next(show);
        this.overlayService.showOverlay(show);
    }
}
