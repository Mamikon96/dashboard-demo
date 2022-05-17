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
	@Input() configs!: ChartConfiguration;

	@Input() title!: string;

	@ViewChild('canvas') canvasRef!: ElementRef;
	@ViewChild(BaseChartDirective) chartComponent!: BaseChartDirective;


	public chartConfig!: ChartConfiguration;
	public showPopup: boolean = false;
	public chart!: Chart;

	public tooltipTitleDescr: string = 'Service:';
	public tooltipTitle!: string;
	public tooltipContentUsedTraffic!: string;
	public tooltipContentAllTraffic!: string;



	constructor(private cdr: ChangeDetectorRef,
				private chartService: ChartManagerService,
				private usersService: UsersService,
				private trafficPipe: TrafficPipe) { }

	ngAfterViewInit(): void {
		this.chart = this.chartComponent.chart;
		this.cdr.detectChanges();
	}

	ngOnInit(): void {
	}

	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
	}

	public chartHovered({ event, active }: { event: any, active: any }): void {
	}


	public onHoverHandler(index: number): void {
		// console.log('enter');
		
		this.tooltipTitle = index.toString();
		if (this.chart.data.labels) {
			this.tooltipTitle = this.chart.data.labels[index].toString();
		}

		let allTraffic: number = this.configs.data[0][index] as number;
		let usedTraffic: number = this.configs.data[1][index] as number;

		this.tooltipContentAllTraffic = this.trafficPipe.transform(allTraffic);
		this.tooltipContentUsedTraffic = this.trafficPipe.transform(usedTraffic);
		
		this.showPopup = true;
	}

	public onLeaveHandler(index: number): void {
		// console.log('leave');

		this.showPopup = false;
	}

}
