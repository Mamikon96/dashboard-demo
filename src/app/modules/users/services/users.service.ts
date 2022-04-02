import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Service } from "./services.service";



// export interface User {
// 	id?: number;
// 	name?: string;
// 	services: Service[];
// 	username?: string;
//     password?: string;
//     email?: string;
// 	phone?: string;
// }

export interface User {
	id?: number;
	name?: string;
	service?: string;
	traffic?: number;
	usedTraffic?: number;
	username?: string;
    password?: string;
    email?: string;
	phone?: string;
}


@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private backendUrl: string = `${environment.backendApi}${environment.usersEndpoint}`;
	private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

	public users$: Observable<User[]> = this.usersSubject.asObservable();


	constructor(private http: HttpClient) {
	}


	// public getUsers(): void {
	// 	this.http.get<User[]>(this.backendUrl)
	// 	.subscribe((data: User[]) => {
	// 		this.usersSubject.next(data);
	// 	})
	// }

	public getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.backendUrl);
	}

}