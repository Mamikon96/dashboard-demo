import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { Observable } from 'rxjs';
import { ChartConfiguration, ChartManagerService, CustomChartData } from '../../services/chart-manager.service';



@Component({
	selector: 'app-chart-wrapper',
	templateUrl: './chart-wrapper.component.html',
	styleUrls: ['./chart-wrapper.component.sass']
})
export class ChartWrapperComponent implements OnChanges, OnInit {

	@Input() userId!: number;
	@Input() serviceId?: number;

	public data: CustomChartData = [[], []];
	public chartType: ChartType = 'doughnut';
	public configs!: ChartConfiguration;



	constructor(private chartService: ChartManagerService,) { }


	ngOnChanges(changes: SimpleChanges): void {
	}

	ngOnInit(): void {
		Chart.defaults.global.tooltips.enabled = false;
		this.configs = this.getChartConfig();
		this.getChartDataObservable()
			.subscribe((data: CustomChartData) => {
				this.configs.data = data;
			});
	}


	private getChartConfig(): ChartConfiguration {
		return this.chartService.getChartConfiguration(this.chartType, this.userId, this.serviceId);
	}

	private getChartDataObservable(): Observable<CustomChartData> {
		return this.chartService.getChartData(this.userId, this.serviceId);
	}

}
