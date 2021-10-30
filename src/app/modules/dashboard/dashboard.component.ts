import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from './../users/services/users.service';
import { Subscription } from 'rxjs';
import { User } from './../users/models/user.model';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {

	public users: User[] = [];

	private usersSub!: Subscription;

	constructor(private usersService: UsersService) { }

	ngOnInit(): void {
		this.usersSub = this.usersService.getUsers()
			.subscribe((users: User[]) => {
				this.users = users;
			});
	}

	ngOnDestroy(): void {
		this.usersSub && this.usersSub.unsubscribe();
	}

}
