import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Service } from "./services.service";
import { Role } from "src/app/services/auth.service";
import { filter, find, switchMap } from "rxjs/operators";



export interface User {
	id?: number;
	name?: string;
	services: Service[];
	username: string;
    password?: string;
    email?: string;
	phone?: string;
	role: Role;
}

// export interface User {
// 	id?: number;
// 	name?: string;
// 	service?: string;
// 	traffic?: number;
// 	usedTraffic?: number;
// 	username?: string;
//     password?: string;
//     email?: string;
// 	phone?: string;
// }


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

	public getUserById(id: number): Observable<User> {
		return this.http.get<User[]>(this.backendUrl)
				.pipe(
					switchMap((users: User[]) => of(users.find((user: User) => user.id === id)!))
				);
	}

}
