import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label, SingleDataSet } from 'ng2-charts';

// Chart.register(...registerables);

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit, AfterViewInit {

	@Input() title!: string;
	// @Input() data!: ChartData;
	// @Input() options!: ChartOptions;// ChartOptions;

	@ViewChild('canvas') canvasRef!: ElementRef;
	@ViewChild(BaseChartDirective) chartComponent!: BaseChartDirective;

	public doughnutChartLabels: Label[] = ['Skype', 'Youtube', 'Instagram'];
	public doughnutChartData: SingleDataSet = [10, 20, 30];
	public doughnutChartType: ChartType = 'doughnut';
	public doughnutChartOptions!: any;



	public barChartOptions: ChartOptions = {
		responsive: true,
		// We use these empty structures as placeholders for dynamic theming.
		scales: { xAxes: [{}], yAxes: [{}] },
		plugins: {
			datalabels: {
				anchor: 'end',
				align: 'end',
			}
		}
	};
	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;

	public barChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
	];


	constructor(private cdr: ChangeDetectorRef) { }

	ngAfterViewInit(): void {
		this.initChartOptions();
		this.chartComponent.chart.generateLegend();
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
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
		console.log(event, active);
	}

	private initChartOptions(): void {
		this.doughnutChartOptions = {
			legend: {
				display: true,
				labels: {
					fontColor: 'black'
				}
			},
			tooltips: {
				callbacks: {
					title: function (tooltipItem: any, data: any) {
						return "Azaza"
						// return data['labels'][tooltipItem[0]['index']];
					},
					label: function (tooltipItem: any, data: any) {
						return "Azaza"
						// return data['datasets'][0]['data'][tooltipItem['index']];
					},
					afterLabel: function (tooltipItem: any, data: any) {
						var dataset = data['datasets'][0];
						var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
						return '(' + percent + '%)';
					}
				},
				backgroundColor: '#FFF',
				titleFontSize: 16,
				titleFontColor: '#0066ff',
				bodyFontColor: '#000',
				bodyFontSize: 14,
				displayColors: false
			}
		};
	}

}
