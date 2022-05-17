import {Injectable} from "@angular/core";
import {PlatformType} from "../modules/shared/directives/screen-width-listener.directive";
import {LocalStorageService} from "./local-storage.service";


export const PLATFORM_KEY = "platform";

@Injectable({
    providedIn: "root"
})
export class PlatformService {

    private currentPlatform: PlatformType = PlatformType.DESKTOP;


    constructor(private localStorage: LocalStorageService<PlatformType>) {
    	const platformFromLocalStorage = this.localStorage.getItem(PLATFORM_KEY);
    	if (platformFromLocalStorage !== null) {
    		this.currentPlatform = platformFromLocalStorage;
	    } else {
    		this.currentPlatform = PlatformType.DESKTOP;
	    }
    }


    public getCurrentPlatform(): PlatformType {
        return this.currentPlatform;
    }

    public setPlatform(platform: PlatformType): void {
        this.currentPlatform = platform;
        this.localStorage.setItem(PLATFORM_KEY, platform);
    }

    public isMobile(): boolean {
        return this.currentPlatform === PlatformType.MOBILE;
    }

    public isDesktop(): boolean {
        return this.currentPlatform === PlatformType.DESKTOP
                || this.currentPlatform === PlatformType.TABLET;
    }
}
