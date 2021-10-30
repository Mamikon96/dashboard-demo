import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { TrafficConverterService } from '../../services/traffic-converter.service';
import { User } from './../../../users/models/user.model';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit {

	@Input() user!: User;

	public panelOpenState: boolean = false;
	// public usedTraffic: number = 30;
	public chartType: ChartType = 'pie';

	constructor(private trafficConverterService: TrafficConverterService) { }

	ngOnInit(): void {
		// console.log(this.trafficConverterService.getValue(1024 * 1024 * 1024 * 20));
		
	}

}
