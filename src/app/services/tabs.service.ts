import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Tab } from 'src/app/models/tab.model';



export enum ETabs {
	DASHBOARD = 'dashboard',
	USERS = 'users',
	PROFILE = 'profile',
	HELP = 'help',
	SETTINGS = 'settings',
	ABOUT = 'about'
}


@Injectable({
	providedIn: 'root'
})
export class TabsService {

	private tabs: Tab[] = [
		{ id: ETabs.DASHBOARD, title: 'Dashboard', iconName: 'pie-chart-outline', active: true },
		{ id: ETabs.USERS, title: 'Users', iconName: 'people-outline' },
		{ id: ETabs.PROFILE, title: 'Profile', iconName: 'person-circle-outline' },
		{ id: ETabs.HELP, title: 'Help', iconName: 'information-circle-outline' },
		{ id: ETabs.SETTINGS, title: 'Settings', iconName: 'settings-outline' }
	];

	private tabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(this.tabs);
	public tabs$: Observable<Tab[]> = this.tabsSubject.asObservable();

	public updateActiveTab(id: string): void {
		this.tabs.forEach(tab => {
			if (tab.id === id) {
				tab.active = true;
			} else {
				tab.active = false;
			}
		});
		this.tabsSubject.next(this.tabs);
	}
}