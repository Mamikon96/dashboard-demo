import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerDirective } from './directives/spinner.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './modules/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { AuthGuard } from './services/auth.guard';
import { AuthService, Role } from './services/auth.service';
// import { AuthModule } from './modules/auth/auth.module';
import { AlertModule } from './modules/alert/alert.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { TresholdDirective } from './modules/shared/directives/treshold.directive';
import { BehaviorSubject, Subject } from 'rxjs';
import { Routes } from '@angular/router';
import { IRouteInfo } from './models/tab.model';


export const ROUTES_TOKEN: InjectionToken<BehaviorSubject<Routes>> = new InjectionToken<BehaviorSubject<Routes>>('');

// export interface IRouteInfo {
// 	id: string;
// 	title: string;
// 	iconName: string;
// 	roles: Roles[];
// }


@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
		SpinnerDirective,
		LoginComponent,
		LogoutComponent,
		LoginPageComponent,
		DashboardPageComponent,
		RegistrationComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule,
		IonicModule.forRoot(),
		// AuthModule,
		// DashboardModule,
		SharedModule,
		AlertModule.forRoot(),
		NotificationsModule.forRoot()
		// ChartsModule
	],
	providers: [
		AuthGuard,
		{
			provide: ROUTES_TOKEN,
			useValue: new Subject<IRouteInfo[]>()
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
