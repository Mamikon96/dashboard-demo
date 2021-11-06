import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent implements OnInit {

	public title = 'Dashboard';
	public tabs?: Tab[];

	constructor() { }

	ngOnInit(): void {
	}

}
