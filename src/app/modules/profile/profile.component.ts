import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Chart from 'chart.js';

import { User } from '../users/services/users.service';
import { ChartDataType, ChartService } from './../shared/services/chart.service';
import { ChartConfiguration } from './../shared/services/chart-manager.service';
import { Service } from '../users/services/services.service';
import { SingleDataSet } from 'ng2-charts';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {

	public user!: User;

	private routeSub!: Subscription;

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		Chart.defaults.global.tooltips.enabled = false;

		this.routeSub = this.route.data.pipe(
			map((data: Data) => data.user)
		).subscribe((user: User) => {
			this.user = user;
		});

	}

	ngOnDestroy(): void {
		this.routeSub && this.routeSub.unsubscribe();
	}

}
