import { Inject, Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IRouteInfo, Tab } from 'src/app/models/tab.model';
import { Role } from "./auth.service";
import { Route, Routes } from '@angular/router';
import { PermissionService } from "./permission.service";
// import { ROUTES_TOKEN } from "../app.module";



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
export class TabsService implements OnInit {

	private tabs: Tab[] = [];
	// [
	// 	{ id: 'dashboard', title: 'Dashboard', iconName: 'pie-chart-outline', active: true, roles: [Roles.admin] },
	// 	{ id: 'users', title: 'Users', iconName: 'people-outline', roles: [Roles.admin] },
	// 	{ id: 'profile', title: 'Profile', iconName: 'person-circle-outline', roles: [Roles.user] },
	// 	{ id: 'help', title: 'Help', iconName: 'information-circle-outline', roles: [Roles.admin, Roles.user] },
	// 	{ id: 'settings', title: 'Settings', iconName: 'settings-outline', roles: [Roles.admin, Roles.user] }
	// ];

	private tabsSubject: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(this.tabs);
	public tabs$: Observable<Tab[]> = this.tabsSubject.asObservable();



	// constructor(@Inject(ROUTES_TOKEN) private routes: Subject<IRouteInfo[]>) {
	// 	this.routes.subscribe((routes: IRouteInfo[]) => {
	// 		this.tabs = [...this.tabs, ...routes];
	// 	});
	// }

	constructor(private permissionService: PermissionService) {
		if (this.permissionService.isAdmin()) {
			this.tabs = this.getTabs(Role.admin);
		} else {
			this.tabs = this.getTabs(Role.user);
		}
		this.updateTabs();
		this.permissionService.role$.subscribe((role: Role) => {
			this.tabs = this.getTabs(role);
			this.updateTabs();
		});
	}


	ngOnInit(): void {
		
	}



	public updateTabs(): void {
		this.tabsSubject.next(this.tabs);
	}

	public updateActiveTab(path: string): void {
		this.tabs = this.tabs.map(tab => {
			if (tab.path === path) {
				tab.active = true;
			} else {
				tab.active = false;
			}
			return tab;
		});
		this.tabsSubject.next(this.tabs);
	}



	private getTabs(role: Role): Tab[] {
		if (role === Role.admin) {
			const prefix = 'admin';
			return [
				{ id: 'dashboard', path: `${prefix}/dashboard`, title: 'Dashboard', iconName: 'pie-chart-outline', active: true},
				{ id: 'users', path: `${prefix}/users`, title: 'Users', iconName: 'people-outline' },
				{ id: 'profile', path: `${prefix}/profile`, title: 'Profile', iconName: 'person-circle-outline' },
				{ id: 'help', path: `${prefix}/help`, title: 'Help', iconName: 'information-circle-outline'},
				{ id: 'settings', path: `${prefix}/settings`, title: 'Settings', iconName: 'settings-outline' }
			];
		} else {
			const prefix = 'user';
			return [
				// { id: 'dashboard', path: `${prefix}/dashboard`, title: 'Dashboard', iconName: 'pie-chart-outline', active: true},
				// { id: 'users', path: `${prefix}/users`, title: 'Users', iconName: 'people-outline' },
				{ id: 'profile', path: `${prefix}/profile`, title: 'Profile', iconName: 'person-circle-outline' },
				{ id: 'help', path: `${prefix}/help`, title: 'Help', iconName: 'information-circle-outline'},
				{ id: 'settings', path: `${prefix}/settings`, title: 'Settings', iconName: 'settings-outline' }
			];
		}
	}

}
