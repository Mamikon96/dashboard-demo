import { Injectable, OnInit } from "@angular/core";
import { AuthService, Role } from "./auth.service";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from "../modules/users/services/users.service";
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PermissionService implements OnInit {

	private roleSubject: Subject<Role> = new Subject<Role>();
	public role$: Observable<Role> = this.roleSubject.asObservable();


	constructor(private auth: AuthService) {
		this.auth.user$.subscribe((user: User) => {
			this.roleSubject.next(user.role);
		});
	}


	ngOnInit(): void {
		
	}


	public isAdmin(): boolean {
		return this.auth.getCurrentUserRole() == Role.admin;
	}

	public isUser(): boolean {
		return this.auth.getCurrentUserRole() == Role.user;
	}

	public getCurrentUserRole(): Role {
		return this.auth.getCurrentUserRole();
	}
}
