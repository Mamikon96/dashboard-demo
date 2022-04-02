import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "./users.service";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageUsersService {

	private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
	public users$: Observable<User[]> = this.usersSubject.asObservable();

	constructor() {
		const data = {
			"users": [
				{ "id": 1, "name": "Mamikon" },
				{ "id": 2, "name": "Vanya" },
				{ "id": 3, "name": "Alexey" },
				{ "id": 4, "name": "Anya" },
				{ "id": 5, "name": "Olya" }
			]
		};
		localStorage.setItem('users', JSON.stringify(data));
	}

	public getUsers(): Observable<User[]> {
		const data: User[] = JSON.parse(localStorage.getItem('users') ?? '').users;
		console.log(data);
		return of(data);
		

		// return this.http.get<User[]>(this.backendUrl);
	}
}