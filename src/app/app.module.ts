import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IonicModule } from '@ionic/angular';
import { TabComponent } from './components/tab/tab.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavigationComponent,
		TabComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		IonicModule.forRoot(),
		DashboardModule,
		NoopAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
