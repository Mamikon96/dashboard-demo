import {Injectable} from "@angular/core";
import {ChartConfiguration, ChartManagerService} from "./chart-manager.service";
import {SingleDataSet} from "ng2-charts";
import {Observable, of} from "rxjs";
import {User, UsersService} from "./../../users/services/users.service";
import {map, switchMap} from "rxjs/operators";
import {Service} from "../../users/services/services.service";


export type ChartDataType = [SingleDataSet, SingleDataSet];


@Injectable()
export class ChartService {

    constructor(private charts: ChartManagerService,
                private users: UsersService) {
    }

    public getChartConfigByUserId(userId: number): ChartConfiguration {
        // return this.charts.getChartConfiguration('doughnut', userId);
        return {
            type: "doughnut",
            data: [[1, 1], [1, 1]],
            labels: ["Used", "All"],
            colors: [{
                backgroundColor: ["#aaa", "#f33"]
            }]
        };
    }

    public getChartDataByUserId(userId: number): Observable<ChartDataType> {
        return this.users.getUserById(userId)
        .pipe(
            map((user: User) => user.services),
            switchMap((services: Service[]) => {
                const data: ChartDataType = [[], []];
                data[0] = services.map((service: Service) => service.usedTraffic);
                data[1] = services.map((service: Service) => service.traffic);
                return of(data);
            })
        );
    }
}
