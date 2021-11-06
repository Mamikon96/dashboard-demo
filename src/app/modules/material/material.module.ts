import { NgModule } from '@angular/core';

import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion"
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
	declarations: [],
	imports: [
		MatTableModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatButtonModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		MatOptionModule,
		MatExpansionModule,
		MatTabsModule,
		MatBadgeModule,
		MatSlideToggleModule
	],
	exports: [
		MatTableModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatButtonModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		MatOptionModule,
		MatExpansionModule,
		MatTabsModule,
		MatBadgeModule,
		MatSlideToggleModule
	]
})
export class MaterialModule { }
