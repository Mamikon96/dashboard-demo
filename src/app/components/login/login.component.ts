import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { User } from 'src/app/modules/users/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/modules/alert/services/alert.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

	public _title = 'Sign In';
    public _form!: FormGroup;

	constructor(private fb: FormBuilder,
				private auth: AuthService,
				private alert: AlertService,
				private router: Router) { }

	ngOnInit(): void {
		this.initForm();

		this.router.events.subscribe(event => {
			let url = null;
			if (event instanceof NavigationEnd) {
				url = event.url.substr(1);
			}
			// console.log(url);
			
		});
	}


	public login(): void {
		let user: User = this.getFormData();
		user = {...user, id: 1};
		if ( this.auth.login(user) ) {
			this.router.navigate(['/api', 'dashboard']);
		} else {
			this.alert.danger('Пользователь не найден!');
		}
	}

	private initForm(): void {
        this._form = this.fb.group({
            username: ['', []],
            password: ['', []]
        });
    }

	private getFormData(): User {
        return {
            username: this._form.get('username')?.value,
            password: this._form.get('password')?.value
        };
    }

}
