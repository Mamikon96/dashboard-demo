import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Tab } from './models/tab.model';
import { TabsService } from './services/tabs.service';
import { LoaderService } from './services/loader.service';



@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

	public title = 'Dashboard';
	public tabs?: Tab[];
	// public isShown$?: Observable<boolean>;

	private tabsSub?: Subscription;

	constructor(private tabsService: TabsService,
		private router: Router,
		private cdr: ChangeDetectorRef,
		public loaderService: LoaderService) {
	}

	ngOnInit(): void {
		this.tabsSub = this.tabsService.tabs$.subscribe((tabs: Tab[]) => {
			this.tabs = tabs;
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
