import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Tab } from './models/tab.model';
import { TabsService } from './services/tabs.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Dashboard';

	tabs?: Tab[];
	tabsSub?: Subscription;

	constructor(private tabsService: TabsService,
				private router: Router) {
	}

	ngOnInit(): void {
		this.tabsSub = this.tabsService.tabs$.subscribe((tabs: Tab[]) => {
			this.tabs = tabs;
		})
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.tabsService.updateActiveTab(event.url.substr(1));
			}
		});
		
	}

	ngOnDestroy(): void {
		this.tabsSub && this.tabsSub.unsubscribe();
	}
}
