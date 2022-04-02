import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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
		
		if (tokenFromSession === token) {
			return true;
		} else {
			this.authService.logout();
			this.router.navigate(['/']);
			return false;
		}
	}
}