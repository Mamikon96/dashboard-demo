import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartManagerService } from '../../services/chart-manager.service';

// Chart.register(...registerables);

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, AfterViewInit {

	@Input() type!: ChartType;

	@Input() title!: string;
	// @Input() data!: ChartData;
	// @Input() options!: ChartOptions;// ChartOptions;

	@ViewChild('canvas') canvasRef!: ElementRef;
	@ViewChild(BaseChartDirective) chartComponent!: BaseChartDirective;

	public labels: Label[] = ['Skype', 'Youtube', 'Instagram'];
	public data: SingleDataSet = [10, 20, 30];
	// public doughnutChartType: ChartType = 'doughnut';
	public options: ChartOptions = {
		cutoutPercentage: 10,
		plugins: {
			title: {
				display: true,
				text: 'Chart.js Line Chart - External Tooltips'
			},
			tooltip: {
				enabled: false
			}
		}
	};

	public chartConfig!: ChartConfiguration;
	// public pieChartPlugins = [pluginDataLabels];


	constructor(private cdr: ChangeDetectorRef,
				private chartService: ChartManagerService) { }

	ngAfterViewInit(): void {
		
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
		this.chartConfig = this.chartService.getChartConfiguration(this.type);
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

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		// console.log(event, active);
	}

	private initChartOptions(): void {
		this.options = {
			legend: {
				display: true,
				labels: {
					fontColor: 'black'
				}
			},
			plugins: {
				tooltip: {
					enabled: false,
					callbacks: {
						// title: function (tooltipItem: any, data: any) {
						// 	return "Azaza"
						// 	// return data['labels'][tooltipItem[0]['index']];
						// },
						label: function (context: any) {
							return "Azaza"
							// return data['datasets'][0]['data'][tooltipItem['index']];
						}
						// afterLabel: function (tooltipItem: any, data: any) {
						// 	var dataset = data['datasets'][0];
						// 	var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
						// 	return '(' + percent + '%)';
						// }
					}
				}
			}
		};
	}

}
