import { NgModule } from "@angular/core";
import { ChartComponent } from "src/app/modules/shared/components/chart/chart.component";
import { MaterialModule } from "../material/material.module";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { TrafficPipe } from './pipes/traffic.pipe';
import { PercentPipe } from './pipes/percent.pipe';
import { TresholdDirective } from "./directives/treshold.directive";
import { ChartDirective } from "./directives/chart.directive";
import { RouterModule } from "@angular/router";
import { ChartService } from "./services/chart.service";
import { ChartWrapperComponent } from './components/chart-wrapper/chart-wrapper.component';
import { ScreenWidthListenerDirective } from './directives/screen-width-listener.directive';

@NgModule({
	declarations: [
		ChartComponent,
		UserInfoComponent,
		TrafficPipe,
		PercentPipe,
		TresholdDirective,
		ChartDirective,
  		ChartWrapperComponent,
    ScreenWidthListenerDirective
	],
	imports: [
		CommonModule,
		MaterialModule,
		ChartsModule,
		RouterModule
	],
    exports: [
        ChartComponent,
        ChartWrapperComponent,
        UserInfoComponent,
        TrafficPipe,
        PercentPipe,
        TresholdDirective,
        ChartDirective,
        MaterialModule,
        ScreenWidthListenerDirective
    ],
	providers: [ChartService]
})
export class SharedModule { }
