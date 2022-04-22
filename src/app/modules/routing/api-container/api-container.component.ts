import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-api-container',
	templateUrl: './api-container.component.html',
	styleUrls: ['./api-container.component.sass']
})
export class ApiContainerComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
		// let routerConfig = this.router.config;
		// // console.log((<any>routerConfig[3])._loadedConfig);
		// console.log(routerConfig[3]);
		
	}

}
