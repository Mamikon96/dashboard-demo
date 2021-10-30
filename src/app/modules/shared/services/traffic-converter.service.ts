import { Injectable } from "@angular/core";


export type measure = 'Gb' | 'Mb' | 'Kb' | 'bytes';


@Injectable({
	providedIn: 'root'
})
export class TrafficConverterService {

	private KILO: number = 1000;
	private KILO_BYTES: number = 1024;
	private MEGA_BYTES: number = 1024 * 1024;
	private GIGA_BYTES: number = 1024 * 1024 * 1024;



	public getValue(bytes: number): string {
		let result: string = '';
		let bytesTemp: number = bytes;

		if (bytesTemp >= this.GIGA_BYTES) {
			const gBytes = Math.floor(this.toGb(bytesTemp));
			bytesTemp = (bytes - gBytes * this.GIGA_BYTES) / this.KILO;
			result += (gBytes + bytesTemp).toFixed(2) + ' Gb';
		}
		else if (bytesTemp >= this.MEGA_BYTES) {
			const mBytes = Math.floor(this.toMb(bytesTemp));
			bytesTemp = (bytes - mBytes * this.MEGA_BYTES) / this.KILO;
			result += (mBytes + bytesTemp).toFixed(2) + ' Mb';
		}
		else if (bytesTemp >= this.KILO_BYTES) {
			const kBytes = Math.floor(this.toKb(bytesTemp));
			bytesTemp = (bytes - kBytes * this.KILO_BYTES) / this.KILO;
			result += (kBytes + bytesTemp).toFixed(2) + ' Kb';
		}
		else {
			result += bytesTemp.toFixed(2);
			result += ' bytes';
		}

		return result;
	}

	public getValueInGb(bytes: number): number {
		let bytesTemp: number = bytes;

		const gBytes = Math.floor(this.toGb(bytesTemp));
		bytesTemp = (bytes - gBytes * this.GIGA_BYTES) / this.KILO;

		return +(gBytes + bytesTemp).toFixed(2);
	}

	public getValueInMb(bytes: number): number {
		let bytesTemp: number = bytes;

		const mBytes = Math.floor(this.toMb(bytesTemp));
		bytesTemp = (bytes - mBytes * this.MEGA_BYTES) / this.KILO;

		return +(mBytes + bytesTemp).toFixed(2);
	}

	public getValueInKb(bytes: number): number {
		let bytesTemp: number = bytes;

		const kBytes = Math.floor(this.toKb(bytesTemp));
		bytesTemp = (bytes - kBytes * this.KILO_BYTES) / this.KILO;

		return +(kBytes + bytesTemp).toFixed(2);
	}


	public toGb(bytes: number): number {
		return bytes / this.GIGA_BYTES;
	}

	public toMb(bytes: number): number {
		return bytes / this.MEGA_BYTES;
	}

	public toKb(bytes: number): number {
		return bytes / this.KILO_BYTES;
	}
}