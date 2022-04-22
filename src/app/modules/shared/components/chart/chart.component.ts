import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { ChartType, ChartOptions, ChartPoint, Chart } from 'chart.js';
import { BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
import { from, interval } from 'rxjs';
import { buffer, bufferCount, filter, map, mergeMap, take } from 'rxjs/operators';
import { Service } from 'src/app/modules/users/services/services.service';
import { User } from 'src/app/modules/users/services/users.service';
import { TrafficPipe } from '../../pipes/traffic.pipe';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartManagerService } from '../../services/chart-manager.service';
import { UsersService } from './../../../users/services/users.service';

// Chart.register(...registerables);

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass'],
	providers: [TrafficPipe]
})
export class ChartComponent implements OnInit, AfterViewInit {

	@Input() type!: ChartType;
	// @Input() user!: User;
	@Input() userId!: number;
	@Input() configs!: ChartConfiguration;

	@Input() title!: string;
	// @Input() data!: ChartData;
	// @Input() options!: ChartOptions;// ChartOptions;

	@ViewChild('canvas') canvasRef!: ElementRef;
	@ViewChild(BaseChartDirective) chartComponent!: BaseChartDirective;

	// public labels: Label[] = ['Skype', 'Youtube', 'Instagram'];
	// public data: SingleDataSet = [10, 20, 30];
	// public doughnutChartType: ChartType = 'doughnut';
	// public options: ChartOptions = {
	// 	cutoutPercentage: 10,
	// 	plugins: {
	// 		title: {
	// 			display: true,
	// 			text: 'Chart.js Line Chart - External Tooltips'
	// 		},
	// 		tooltip: {
	// 			enabled: false
	// 		}
	// 	}
	// };

	public chartConfig!: ChartConfiguration;
	public showPopup: boolean = false;
	public chart!: Chart;

	public tooltipTitleDescr: string = 'Service:';
	// public tooltipContentDescr: string = 'Traffic:';
	public tooltipTitle!: string;
	public tooltipContentUsedTraffic!: string;
	public tooltipContentAllTraffic!: string;

	// public pieChartPlugins = [pluginDataLabels];


	constructor(private cdr: ChangeDetectorRef,
				private chartService: ChartManagerService,
				private usersService: UsersService,
				private trafficPipe: TrafficPipe) { }

	ngAfterViewInit(): void {
		this.chart = this.chartComponent.chart;
		this.cdr.detectChanges();
		// console.log(this.chartComponent.chart.getElementsAtEvent('click'));
	}

	ngOnInit(): void {
		// this.chartConfig = this.chartService.getChartConfiguration(this.type, this.user.id);
		// console.log(this.chartConfig);
		// interval(1000)
		// 	.pipe(
		// 		bufferCount(4),
		// 		take(5)
		// 	)
		// 	.subscribe((data: number[]) => {
		// 		this.chartConfig.data = data;
				
		// 	})	

		// this.usersService.getUsers()
		// 	.pipe(
		// 		mergeMap((users: User[]) => from(users)),
		// 		filter((user: User) => user.id === this.user.id),
		// 		map((user: User) => user.services),
		// 		map((services: Service[]) => services.map((service: Service) => service.usedTraffic))
		// 	)
		// 	.subscribe((traffics: number[]) => {
		// 		// const values = traffics.map((traffic: number) => {
		// 		// 	return this.trafficPipe.transform(traffic);
		// 		// });
		// 		// console.log(values);
		// 		// this.chartConfig.data = values.map((value: string) => value as ChartPoint)
		// 		this.chartConfig.data = traffics;
		// 	});
	}

	// private initChartData(): void {
	// 	this.data = {
	// 		datasets: [{
	// 			data: [10, 20, 30],
	// 			backgroundColor: ['#832b2b', '#343685', '#2d5c2e'],
	// 			hoverOffset: 20,
	// 			borderWidth: 5,
	// 			hoverBorderColor: '#fff',
	// 			pointHoverBorderWidth: 10,
	// 			label: 'Expenditures'
	// 		}],
	// 		labels: [
	// 			'Skype',
	// 			'Youtube',
	// 			'Instagram'
	// 		]
	// 	};
	// }

	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	}

	public chartHovered({ event, active }: { event: any, active: any }): void {
		// console.log(event.active!, active);
		// console.log(active[0]._index);
		// console.log(active[0]);
		// this.showPopup = true;
		
	}

	// private initChartOptions(): void {
	// 	this.options = {
	// 		legend: {
	// 			display: true,
	// 			labels: {
	// 				fontColor: 'black'
	// 			}
	// 		},
	// 		plugins: {
	// 			tooltip: {
	// 				enabled: false,
	// 				callbacks: {
	// 					// title: function (tooltipItem: any, data: any) {
	// 					// 	return "Azaza"
	// 					// 	// return data['labels'][tooltipItem[0]['index']];
	// 					// },
	// 					label: function (context: any) {
	// 						return "Azaza"
	// 						// return data['datasets'][0]['data'][tooltipItem['index']];
	// 					}
	// 					// afterLabel: function (tooltipItem: any, data: any) {
	// 					// 	var dataset = data['datasets'][0];
	// 					// 	var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
	// 					// 	return '(' + percent + '%)';
	// 					// }
	// 				}
	// 			}
	// 		}
	// 	};
	// }


	public onHoverHandler(index: number): void {
		// console.log('hover', index);
		this.tooltipTitle = index.toString();
		if (this.chart.data.labels) {
			this.tooltipTitle = this.chart.data.labels[index].toString();
		}
		// console.log(this.configs.data);
		
		// if (this.chart.data.datasets && this.chart.data.datasets[0].data) {
		// 	const traffic: number = this.chart.data.datasets[0].data[index] as number;
		// 	const transformedTraffic = this.trafficPipe.transform(traffic);
		// 	this.tooltipContentTraffic = transformedTraffic;
		// }

		let allTraffic: number = this.configs.data[0][index] as number;
		let usedTraffic: number = this.configs.data[1][index] as number;

		this.tooltipContentAllTraffic = this.trafficPipe.transform(allTraffic);
		this.tooltipContentUsedTraffic = this.trafficPipe.transform(usedTraffic);
		
		this.showPopup = true;
	}

	public onLeaveHandler(index: number): void {
		// console.log('leave', index);
		this.showPopup = false;
	}

}
