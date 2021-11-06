import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertService } from "./services/alert.service";
import { AlertComponent } from './components/alert/alert.component';
import { AlertPlaceholderComponent } from "./components/alert-placeholder/alert-placeholder.component";
import { AlertsStoreService } from "./services/alerts-store.service";
import { AlertsVisibilityService } from "./services/alerts-visibility.service";


@NgModule({
	entryComponents: [AlertComponent],
	declarations: [AlertComponent,AlertPlaceholderComponent],
	imports: [CommonModule],
	exports: [AlertPlaceholderComponent]
})
export class AlertModule {

	static forRoot(): ModuleWithProviders<AlertModule> {
		return {
			ngModule: AlertModule,
			providers: [
				AlertService,
				AlertsStoreService,
				AlertsVisibilityService
			]
		};
	}
}