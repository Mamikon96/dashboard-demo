import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, of } from "rxjs";

import { environment } from "src/environments/environment";



export interface Service {
	id: number;
	name: string;
	usedTraffic: number;
	traffic: number;
}


@Injectable({
	providedIn: 'root'
})
export class ServicesService {

	private backendUrl: string = `${environment.backendApi}${environment.usersEndpoint}`;
	private servicesSubject: BehaviorSubject<Service[]> = new BehaviorSubject<Service[]>([]);

	public services$: Observable<Service[]> = this.servicesSubject.asObservable();


	constructor(private http: HttpClient) {
	}


	public getServices(): Observable<any> {
		return of(EMPTY);
	}
	
}