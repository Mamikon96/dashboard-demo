import {Component, OnDestroy, OnInit} from "@angular/core";
import {Tab} from "../../../models/tab.model";
import {TabsService} from "../../../services/tabs.service";
import {Subscription} from "rxjs";
import {OverlayService} from "../../overlay/services/overlay.service";
import {PlatformService} from "../../../services/platform.service";
import {NavigationMenuManagerService} from "../../../services/navigation-menu-manager.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit, OnDestroy {

    public showNavigationMenu = false;
    public title = "Dashboard";
    public tabs?: Tab[];

    private tabsSub?: Subscription;

    constructor(public overlayService: OverlayService,
                private tabsService: TabsService,
                public platform: PlatformService,
                public navMenuManager: NavigationMenuManagerService) {
    }

    ngOnInit(): void {
        this.tabsSub = this.tabsService.tabs$.subscribe((tabs: Tab[]) => {
            this.tabs = [...tabs];
        });
    }

    ngOnDestroy(): void {
        this.tabsSub && this.tabsSub.unsubscribe();
    }
}
