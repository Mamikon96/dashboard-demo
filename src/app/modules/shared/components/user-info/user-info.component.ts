import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { User } from 'src/app/modules/users/services/users.service';
import { TrafficConverterService } from '../../services/traffic-converter.service';
import { ChartConfiguration, ChartManagerService, CustomChartData } from './../../services/chart-manager.service';
import { UsersService } from './../../../users/services/users.service';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Service } from 'src/app/modules/users/services/services.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ChartDataType } from '../../services/chart.service';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit, OnChanges {

	@Input() user!: User;

	public panelOpenState: boolean = false;


	constructor(private trafficConverterService: TrafficConverterService,
				private chartService: ChartManagerService,
				private usersService: UsersService) { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		const user: User = changes.user.currentValue;
	}

}
