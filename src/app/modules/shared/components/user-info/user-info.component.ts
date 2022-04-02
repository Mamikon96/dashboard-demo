import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { User } from 'src/app/modules/users/services/users.service';
import { TrafficConverterService } from '../../services/traffic-converter.service';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit, OnChanges {

	@Input() user!: User;

	public panelOpenState: boolean = false;
	// public usedTraffic: number = 30;
	public chartType: ChartType = 'pie';
	public usedTrafficByUserInPercent: number = 0;


	constructor(private trafficConverterService: TrafficConverterService) { }

	ngOnInit(): void {
		// console.log(this.trafficConverterService.getValue(1024 * 1024 * 1024 * 20));
	}

	ngOnChanges(changes: SimpleChanges): void {
		const user: User = changes.user.currentValue;
		if (user.usedTraffic && user.traffic) {
			this.usedTrafficByUserInPercent = user.usedTraffic / user.traffic;
		}
	}

}
