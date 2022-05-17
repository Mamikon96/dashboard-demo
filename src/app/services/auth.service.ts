import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {User, UsersService} from '../modules/users/services/users.service';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
// import { AuthModule } from '../modules/auth/auth.module';

import {environment} from 'src/environments/environment';
import {Subject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    private userSubject: Subject<User> = new ReplaySubject<User>(1);
    public user$: Observable<User> = this.userSubject.asObservable();

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
        });
    }


    ngOnDestroy(): void {
        this.usersSub && this.usersSub.unsubscribe();
    }

    public login(user: User): User | null {
        const currUser: User = this.findUserByUsername(user.username!);
        if (currUser) {
            // this._isLoggedIn = true;
            // this.loggedInSubject.next(true);
            AuthService.user = currUser;
            this.userSubject.next(currUser);

            // const salt = bcrypt.genSaltSync(10);
            // const token = bcrypt.hashSync(environment.secret, environment.salt);
            const token = btoa(environment.secret);
            sessionStorage.setItem('token', token);

            const user = btoa(JSON.stringify(currUser));
            sessionStorage.setItem('user', user);

            // const role = btoa(environment.secret);
            // sessionStorage.setItem('role', role);

            return currUser;
        } else {
            return null;
        }
    }

    public logout(): boolean {
        // this._isLoggedIn = false;
        // this.loggedInSubject.next(false);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        // sessionStorage.removeItem('role');
        return true;
    }

    public updateCurrentUser(user: User): void {
        this.userSubject.next(user);
    }

    public getCurrentUserRole(): Role {
        if (AuthService.user) {
            return AuthService.user.role;
        } else {
            return Role.user;
        }
    }

    private findUserByUsername(username: string): User {
        const user: User = this.users.find(u => u.username === username)!;

        return user;
    }

}


export enum Role {
    admin = 'admin',
    user = 'user'
}
