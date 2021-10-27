import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appSpinner]'
})
export class SpinnerDirective implements AfterViewInit {

	constructor(private elem: ElementRef) { }

	ngAfterViewInit(): void {
		const element = this.elem.nativeElement;
		const circle = element.querySelector("circle");
		circle.style.stroke = '#1b8c97';
	}

}
