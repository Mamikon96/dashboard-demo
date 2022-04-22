import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
	{ path: '', component: ProfileComponent }
];


@NgModule({
	declarations: [
		ProfileComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule
	],
	exports: [
		RouterModule
	]
})
export class ProfileModule { }
