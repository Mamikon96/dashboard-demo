import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';
import { TabsService } from '../../../services/tabs.service';
import {Router} from '@angular/router';
import {PlatformService} from '../../../services/platform.service';
import {NavigationMenuManagerService} from '../../../services/navigation-menu-manager.service';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.sass']
})
export class TabComponent implements OnInit {

	@Input() tab!: Tab;
	@Output() onHover: EventEmitter<string> = new EventEmitter<string>();

	constructor(private tabsService: TabsService,
	            private router: Router,
	            private platform: PlatformService,
	            private navMenuManager: NavigationMenuManagerService) { }

	ngOnInit(): void {
	}

	@HostListener('click')
	hoverHandler(): void {
		this.tabsService.updateActiveTab(this.tab.path);
	}

	public tabClickHandler(event: any): void {
		event.preventDefault();
		this.router.navigate([this.tab.path]);
		if (this.platform.isMobile()) {
			this.navMenuManager.showNavMenu(false);
		}
	}

}
