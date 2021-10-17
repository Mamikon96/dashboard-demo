import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
	declarations: [
		PageNotFoundComponent
	],
	imports: [
	CommonModule,
		PageNotFoundRoutingModule,
		IonicModule
	]
})
export class PageNotFoundModule { }
