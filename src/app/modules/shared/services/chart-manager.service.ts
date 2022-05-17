import {Injectable} from "@angular/core";
import {ChartOptions, ChartType} from "chart.js";
import {Color, Label, PluginServiceGlobalRegistrationAndOptions, SingleOrMultiDataSet} from "ng2-charts";
import {from, Observable, of} from "rxjs";
import {filter, map, mergeMap, share, switchMap} from "rxjs/operators";
import {User, UsersService} from "../../users/services/users.service";
import {Service} from "./../../users/services/services.service";


// export type ChartDataType = 'single' | 'double';

export type CustomChartData = [SingleOrMultiDataSet, SingleOrMultiDataSet];

export interface ChartConfiguration {
    data: CustomChartData;
    labels: Label[];
    options?: ChartOptions;
    colors: Color[];
    plugins?: PluginServiceGlobalRegistrationAndOptions[];
    type: ChartType;
    // chartHover: EventEmitter<{
    //     event: MouseEvent;
    //     active: {}[];
    // }>;
}


@Injectable({
    providedIn: "root"
})
export class ChartManagerService {

    private users$: Observable<User[]>;


    constructor(private usersService: UsersService) {
        this.users$ = this.usersService.getUsers().pipe(share());
    }


    // public getChartConfiguration(chartType: ChartType): ChartConfiguration {
    // 	return {
    // 		labels: this.getLabels(chartType),
    // 		data: this.getData(chartType),
    // 		options: this.getOptions(chartType),
    // 		colors: this.getColors(chartType)
    // 	};
    // }

    public getChartConfiguration(chartType: ChartType, userId: number, serviceId?: number): ChartConfiguration {
        return {
            labels: this.getLabels(userId, serviceId),
            data: this.getData(chartType, userId),
            options: this.getOptions(chartType),
            colors: this.getColors(chartType),
            plugins: this.getPlugins(),
            type: chartType
        };
    }

    public getChartData(userId: number, serviceId?: number): Observable<CustomChartData> {
        if (serviceId) {
            return this.getSingleChartData(userId, serviceId);
        } else {
            return this.getMultipleChartData(userId);
        }
    }

    public getMultipleChartData(userId: number): Observable<CustomChartData> {
        return this.users$
        .pipe(
            mergeMap((users: User[]) => from(users)),
            filter((user: User) => user.id === userId),
            map((user: User) => user.services),
            switchMap((services: Service[]) => {
                const data: CustomChartData = [[], []];
                data[0] = services.map((service: Service) => service.traffic);
                data[1] = services.map((service: Service) => service.usedTraffic);
                return of(data);
            })
        );
    }

    public getSingleChartData(userId: number, serviceId: number): Observable<CustomChartData> {
        return this.users$
        .pipe(
            mergeMap((users: User[]) => from(users)),
            filter((user: User) => user.id === userId),
            mergeMap((user: User) => user.services),
            filter((service: Service) => service.id === serviceId),
            switchMap((service: Service) => {
                const data: CustomChartData = [[], []];
                data[0] = [service.usedTraffic, service.traffic];
                data[1] = [service.usedTraffic, service.traffic];
                return of(data);
            })
        );
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

    private getLabels(userId: number, serviceId?: number): Label[] {
        if (serviceId) {
            return this.getDefaultLabels();
        }
        return this.getAllLabelsForUser(userId);
    }

    private getAllLabelsForUser(userId: number): Label[] {
        const services: string[] = [];
        this.users$
        .subscribe((users: User[]) => {
            users.forEach((user: User) => {
                if (user.id === userId && user.services) {
                    services.push(
                        ...user.services.map((service: Service) => service.name)
                    );
                }
            });
        });
        return services as Label[];
    }

    private getDefaultLabels(): Label[] {
        return ["Used", "All"] as Label[];
    }


    private getData(chartType: ChartType, userId: number, serviceId?: number): CustomChartData {
        let traffics: CustomChartData = [[1, 1, 1, 1], [1, 1, 1, 1]];
        this.getMultipleChartData(userId)
        .subscribe((res: CustomChartData) => {
            traffics = res;
        });

        let data: CustomChartData = [[], []];

        if (chartType === "pie") {
            // data = [30, 40, 10, 20];
            data = [...traffics];
        } else if (chartType === "doughnut") {
            // data = [25, 35, 40];
            data = [...traffics];
        }

        return data;
    }

    private getOptions(chartType: ChartType): ChartOptions {
        let options: ChartOptions = {};
        if (chartType === "pie") {
            options = {
                tooltips: {
                    enabled: false
                }
            };
        } else if (chartType === "doughnut") {
            options = {
                tooltips: {
                    enabled: false
                },
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
                    "#832b2b",
                    "#343685",
                    "#2d5c2e",
                    "#5d5c2e"
                ]
            }
        ];
        return colors;
    }

    private getPlugins(): PluginServiceGlobalRegistrationAndOptions[] {
        return [{
            id: "1",
            beforeEvent(chart: Chart, event: Event, options: any) {
                // console.log(chart);

            }
        }];
    }

    private showChartTooltipPopup(): void {
    }

    private hideChartTooltipPopup(): void {
    }

    private getHoverCallback(chartType: ChartType): void {
    }
}
