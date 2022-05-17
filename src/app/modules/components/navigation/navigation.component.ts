import {Component, Input, OnInit} from "@angular/core";
import {Tab} from "src/app/models/tab.model";
import {NavigationMenuManagerService} from "../../../services/navigation-menu-manager.service";
import {PlatformService} from "../../../services/platform.service";

@Component({
    selector: "app-navigation",
    templateUrl: "./navigation.component.html"
})
export class NavigationComponent implements OnInit {

    @Input() tabs?: Tab[];

    constructor(public navMenuManager: NavigationMenuManagerService,
                public platformService: PlatformService) {
    }

    ngOnInit(): void {
    }

    public trackByFn(index: number, item: any): number {
        return index;
    }

}
