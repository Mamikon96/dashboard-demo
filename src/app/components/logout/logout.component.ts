import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

	constructor(private route: Router,
				private auth: AuthService) { }

	ngOnInit(): void {
		this.auth.logout();
		this.route.navigate(['/login']);
	}

}
