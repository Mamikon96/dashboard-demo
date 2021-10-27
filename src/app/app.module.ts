import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TabComponent } from './components/tab/tab.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MaterialModule } from './modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerDirective } from './directives/spinner.directive';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NavigationComponent,
		TabComponent,
		SpinnerComponent,
		SpinnerDirective
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		IonicModule.forRoot(),
		DashboardModule,
		MaterialModule,
		ChartsModule
	],
	providers: [

	],
	bootstrap: [AppComponent]
})
export class AppModule { }
