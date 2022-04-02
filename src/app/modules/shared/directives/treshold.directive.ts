import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
	selector: '[appTreshold]'
})
export class TresholdDirective implements AfterViewInit {

	@Input('appTreshold') value: number | undefined;

	@HostBinding('style.color') elemColor = 'red';


	constructor(private elem: ElementRef,
				private cdr: ChangeDetectorRef) { }

	ngAfterViewInit(): void {
		const element = this.elem.nativeElement;
		if (this.value && this.value < 0.5) {
			this.elemColor = 'green';
		} else if (this.value && this.value < 0.75) {
			this.elemColor = 'orange';
		} else {
			this.elemColor = 'red';
		}
		this.cdr.detectChanges();
	}

}
