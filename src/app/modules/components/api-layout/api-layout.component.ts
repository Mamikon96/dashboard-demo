import { ChangeDetectorRef, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TabsService } from 'src/app/services/tabs.service';

@Component({
	selector: 'app-api-layout',
	templateUrl: './api-layout.component.html',
	styleUrls: ['./api-layout.component.sass']
})
export class ApiLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

	public title = 'Dashboard';
	public tabs?: Tab[];

	private tabsSub?: Subscription;

	constructor(private tabsService: TabsService,
				private router: Router,
				private cdr: ChangeDetectorRef,
				public loaderService: LoaderService,
				public auth: AuthService) { }

	ngOnInit(): void {
		this.tabsSub = this.tabsService.tabs$.subscribe((tabs: Tab[]) => {
			this.tabs = [...tabs];
			
		})
		this.router.events.subscribe(event => {
			let url = null;
			if (event instanceof NavigationEnd) {
				url = event.urlAfterRedirects.substring(event.url.indexOf('/') + 1);
			}
			switch (true) {
				case event instanceof NavigationStart: {
					this.loaderService.show();
					break;
				}
				case event instanceof NavigationEnd: {
					this.loaderService.hide();
					this.tabsService.updateActiveTab(url!);
					break;
				}
				case event instanceof NavigationCancel:
				case event instanceof NavigationError: {
					this.loaderService.hide();
					break;
				}
				default: {
					break;
				}
			}


			// if (event instanceof NavigationEnd) {
			// 	this.tabsService.updateActiveTab(event.url.substr(1));
			// }
		});
	}

	ngAfterViewInit(): void {
		this.cdr.markForCheck();
	}

	ngOnDestroy(): void {
		this.tabsSub && this.tabsSub.unsubscribe();
	}

}
