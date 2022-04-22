import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User, UsersService } from "./users.service";
import { PermissionService } from './../../../services/permission.service';
import { AuthService } from "src/app/services/auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

	constructor(private usersService: UsersService,
				private authService: AuthService,
				private permissionService: PermissionService) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): User | Observable<User> | Promise<User> {
		if (this.permissionService.isAdmin()) {
			return this.usersService.getUserById(+route.paramMap.get('id')!);
		} else {
			// return this.authService.user$.pipe(
			// 	tap((user: User) => console.log('Resolver: ' + user)),
			// 	map((user: User) => user)
			// );
			return new Promise(resolve => {
				this.authService.user$.subscribe((user: User) => resolve(user));
			});
		}
	}
}