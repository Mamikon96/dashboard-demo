import { NgModule } from "@angular/core";
import { ChartComponent } from "src/app/modules/shared/components/chart/chart.component";
import { MaterialModule } from "../material/material.module";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { TrafficPipe } from './pipes/traffic.pipe';
import { PercentPipe } from './pipes/percent.pipe';
import { TresholdDirective } from "./directives/treshold.directive";

@NgModule({
	declarations: [
		ChartComponent,
		UserInfoComponent,
		TrafficPipe,
		PercentPipe,
		TresholdDirective
	],
	imports: [
		CommonModule,
		MaterialModule,
		ChartsModule
	],
	exports: [
		ChartComponent,
		UserInfoComponent,
		TrafficPipe,
		PercentPipe,
		TresholdDirective,
		MaterialModule
	]
})
export class SharedModule { }