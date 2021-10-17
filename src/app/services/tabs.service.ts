import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Tab } from 'src/app/models/tab.model';

@Injectable({
	providedIn: 'root'
})
export class TabsService {

	private tabs: Tab[] = [
		{ id: 'dashboard', title: 'Dashboard', iconName: 'pie-chart-outline', active: true },
		{ id: 'users', title: 'Users', iconName: 'people-outline' },
		{ id: 'profile', title: 'Profile', iconName: 'person-circle-outline' },
		{ id: 'help', title: 'Help', iconName: 'information-circle-outline' },
		{ id: 'settings', title: 'Settings', iconName: 'settings-outline' }
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