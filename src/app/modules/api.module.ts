import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApiLayoutComponent } from './components/api-layout/api-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaterialModule } from './material/material.module';
import { TabComponent } from './components/tab/tab.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ApiRoutingModule } from './routing/api-routing.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';



@NgModule({
	declarations: [
		ApiLayoutComponent,
		HeaderComponent,
		NavigationComponent,
		TabComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		IonicModule,
		ApiRoutingModule,
		AuthModule,
		NotificationsModule
	],
	exports: [],
})
export class ApiModule { }
