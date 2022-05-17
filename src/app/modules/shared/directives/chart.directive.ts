import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { BaseChartDirective, ThemeService } from "ng2-charts";
import { Chart } from 'chart.js';

@Directive({
	selector: '[appChart]'
})
export class ChartDirective implements OnChanges {

	@Input('appChart') chart!: Chart;

	@Output() onHover: EventEmitter<number> = new EventEmitter();
	@Output() onLeave: EventEmitter<number> = new EventEmitter();

	private currIndex: number = -1;

	constructor(public el: ElementRef) {
	}


	ngOnChanges(changes: SimpleChanges): void {

	}



	@HostListener('mousemove', ['$event'])
	public onMousemoveHandler(event: any) {
		const points: any = this.chart.getElementsAtEvent(event);

		if (points && points.length) {
			const index = points[0]._index;
			if (index === this.currIndex) return;

			// todo: update tooltip
			if (this.currIndex !== -1) {
				this.onLeave.emit(this.currIndex);
			}
			this.onHover.emit(index);

			this.currIndex = index;
		}
	}

	@HostListener('mouseleave', ['$event'])
	public onMouseLeaveHandler(event: any) {
		if (this.currIndex !== -1) {
			this.onLeave.emit(this.currIndex);
			this.currIndex = -1;
		}
	}
}