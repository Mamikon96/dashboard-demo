import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LSStoreDirective } from './directives/ls-store.directive';



@NgModule({
	declarations: [LSStoreDirective],
	imports: [CommonModule],
	exports: [LSStoreDirective]
})
export class DirectivesModule { }
