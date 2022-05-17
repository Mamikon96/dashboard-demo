import {Directive, HostListener} from "@angular/core";
import {PlatformService} from "../../../services/platform.service";


export enum PlatformType {
    MOBILE = "mobile",
    TABLET = "tablet",
    DESKTOP = "desktop"
}

export enum ScreenSize {
    mobile = 414,
    tablet = 784,
    desktop
}


@Directive({
    selector: "[appScreenWidthListener]"
})
export class ScreenWidthListenerDirective {

    constructor(private platformService: PlatformService) {
    }

    @HostListener("window:resize", ["$event"])
    public screenWidthListener(event: any): void {
        if (event.target.innerWidth <= ScreenSize.mobile) {
            this.platformService.setPlatform(PlatformType.MOBILE);
        } else if (event.target.innerWidth <= ScreenSize.tablet) {
            this.platformService.setPlatform(PlatformType.TABLET);
        } else {
            this.platformService.setPlatform(PlatformType.DESKTOP);
        }
    }

}
