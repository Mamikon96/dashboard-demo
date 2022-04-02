import { Injectable, EventEmitter } from "@angular/core";
import { ChartColor, ChartOptions, ChartType } from "chart.js";
import { Color, Label, SingleDataSet, SingleOrMultiDataSet } from "ng2-charts";
import { filter } from "rxjs/operators";
import { User, UsersService } from "../../users/services/users.service";


export interface ChartConfiguration {
	data: SingleOrMultiDataSet;
	labels: Label[];
	options: ChartOptions;
	colors: Color[];
	// chartHover: EventEmitter<{
	//     event: MouseEvent;
	//     active: {}[];
	// }>;
}


@Injectable({
	providedIn: 'root'
})
export class ChartManagerService {

	constructor(private usersService: UsersService) {}


	// public getChartConfiguration(chartType: ChartType): ChartConfiguration {
	// 	return {
	// 		labels: this.getLabels(chartType),
	// 		data: this.getData(chartType),
	// 		options: this.getOptions(chartType),
	// 		colors: this.getColors(chartType)
	// 	};
	// }

	public getChartConfiguration(chartType: ChartType, userId?: number): ChartConfiguration {
		return {
			labels: this.getLabels(chartType, userId),
			data: this.getData(chartType),
			options: this.getOptions(chartType),
			colors: this.getColors(chartType)
		};
	}

	// private getLabels(chartType: ChartType): Label[] {
	// 	let labels: Label[] = [];
	// 	if (chartType === 'pie') {
	// 		labels = ['Skype', 'Youtube', 'Telegram', 'Zoom'];
	// 	} else if (chartType === 'doughnut') {
	// 		labels = ['Skype', 'Youtube', 'Instagram'];
	// 	}

	// 	return labels;
	// }

	private getLabels(chartType: ChartType, userId?: number): Label[] {
		console.log(`user id: ${userId}`);
		const services: string[] = [];
		this.usersService.getUsers()
			.subscribe((users: User[]) => {
				users.forEach((user: User) => {
					if (user.id === userId && user.service) {
						services.push(user.service);
					}
				});
			});
		
		let labels: Label[] = [];
		if (chartType === 'pie') {
			labels = ['Skype', 'Youtube', 'Telegram', 'Zoom'];
		} else if (chartType === 'doughnut') {
			labels = ['Skype', 'Youtube', 'Instagram'];
		}

		return services;
	}

	private getData(chartType: ChartType): SingleDataSet {
		let data: SingleDataSet = [];

		if (chartType === 'pie') {
			data = [30, 40, 10, 20];
		} else if (chartType === 'doughnut') {
			data = [25, 35, 40];
		}

		return data;
	}

	private getOptions(chartType: ChartType): ChartOptions {
		let options: ChartOptions = {};
		if (chartType === 'pie') {
			options = {
				legend: {
					position: 'top',
				},
				plugins: {
					datalabels: {
						formatter: (value: any, ctx: any) => {
							const label = ctx.chart.data.labels[ctx.dataIndex];
							return label;
						},
					},
				}
			};
		} else if (chartType === 'doughnut') {
			options = {
				responsive: true,
				plugins: {
					datalabels: {
						formatter: (value: any, ctx: any) => {
						  const label = ctx.chart.data.labels[ctx.dataIndex];
						  return label;
						},
					  },
				}
			};
		}

		return options;
	}

	private getColors(chartType: ChartType): Color[] {
		const colors: Color[] = [
			{
				backgroundColor: [
					'#832b2b',
					'#343685',
					'#2d5c2e',
					'#5d5c2e'
				]
			}
		];
		return colors;
	}

	private getHoverCallback(chartType: ChartType): void { }
}