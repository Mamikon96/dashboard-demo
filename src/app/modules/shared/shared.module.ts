import { NgModule } from "@angular/core";
import { ChartComponent } from "src/app/modules/shared/components/chart/chart.component";
import { MaterialModule } from "../material.module";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";

@NgModule({
	declarations: [
		ChartComponent,
		UserInfoComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ChartsModule
	],
	exports: [
		ChartComponent,
		UserInfoComponent
	]
})
export class SharedModule {}