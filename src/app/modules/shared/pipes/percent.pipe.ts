import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'percent'
})
export class PercentPipe implements PipeTransform {

	transform(value: number, divider: number, precision: number = 2): string {
		return (value / divider * 100).toFixed(precision);
	}

}
