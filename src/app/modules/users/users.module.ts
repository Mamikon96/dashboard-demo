import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableContentComponent } from './components/table-content/table-content.component';
import { DirectivesModule } from '../directives/directives.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
	declarations: [
		UsersComponent,
		TableHeaderComponent,
		TableContentComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		MaterialModule,
		DirectivesModule,
		SharedModule
	],
	exports: [
		UsersComponent
	],
	// providers: [
	// 	{
	// 		provide: UsersService,
	// 		useClass: LocalStorageUsersService
	// 	}
	// ]
})
export class UsersModule { }
