import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../modules/users/services/users.service';


@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const tokenFromSession = sessionStorage.getItem('token');
		const token = btoa(environment.secret);

		// const roleFromSession = sessionStorage.getItem('role');
		// const role = btoa(environment.secret);
		
		if (tokenFromSession === token ) {
			const userFromSession = sessionStorage.getItem('user');
			if (userFromSession) {
				const user: User = JSON.parse(atob(userFromSession));
				console.log(user);
				this.authService.updateCurrentUser(user);
			}

			return true;
		} else {
			this.authService.logout();
			this.router.navigate(['/login']);
			return false;
		}
	}
}