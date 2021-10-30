import { Pipe, PipeTransform } from '@angular/core';
import { measure, TrafficConverterService } from './../services/traffic-converter.service';


@Pipe({
	name: 'traffic'
})
export class TrafficPipe implements PipeTransform {

	constructor(private trafficConverterService: TrafficConverterService) { }

	transform(value: number, measure: measure = 'bytes'): string {
		// if (measure === 'bytes') {
		// 	return this.trafficConverterService.getValue(value);
		// }
		switch (measure) {
			case 'Gb':
				return this.trafficConverterService.getValueInGb(value) + ' Gb';
			case 'Mb':
				return this.trafficConverterService.getValueInMb(value) + ' Mb';
			case 'Kb':
				return this.trafficConverterService.getValueInKb(value) + ' Kb';
			default:
				return this.trafficConverterService.getValue(value);
		}
	}

}
