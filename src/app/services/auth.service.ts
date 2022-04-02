import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { User, UsersService } from '../modules/users/services/users.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthModule } from '../modules/auth/auth.module';

import * as bcrypt from 'bcryptjs';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class AuthService implements OnDestroy {

	static instance?: AuthService;


	public get isLoggedIn() {
		return this._isLoggedIn;
	}

	public static user: User;

	private users!: User[];
	private usersSub!: Subscription;
	private _isLoggedIn: boolean = false;

	private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();


	constructor(private usersService: UsersService) {
		if (AuthService.instance !== undefined) {
			throw new Error('Import AuthModule only once.');
		}

		AuthService.instance = this;

		this.usersSub = this.usersService.getUsers()
			.subscribe((users: User[]) => {
				this.users = users;
			})
	}


	ngOnDestroy(): void {
		this.usersSub && this.usersSub.unsubscribe();
	}

	public login(user: User): boolean {
		if (this.findUserByUsername(user.username!)) {
			// this._isLoggedIn = true;
			// this.loggedInSubject.next(true);
			AuthService.user = user;

			// const salt = bcrypt.genSaltSync(10);
			// const token = bcrypt.hashSync(environment.secret, environment.salt);
			const token = btoa(environment.secret);

			sessionStorage.setItem('token', token);
			return true;
		} else {
			return false;
		}
	}

	public logout(): boolean {
		// this._isLoggedIn = false;
		// this.loggedInSubject.next(false);
		sessionStorage.removeItem('token');
		return true;
	}

	private findUserByUsername(username: string): User {
		const user: User = this.users.find(u => u.username === username)!;

		return user;
	}
}