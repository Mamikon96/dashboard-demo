import { Directive, OnInit } from '@angular/core';
import { UsersService } from '../../users/services/users.service';
import { LocalStorageUsersService } from '../../users/services/localstorage-users.service';

@Directive({
	selector: '[appLSStore]',
	providers: [
		{
			provide: UsersService,
			useClass: LocalStorageUsersService
		}
	]
})
export class LSStoreDirective implements OnInit {

	constructor() {
		console.log('directive');
	}

	ngOnInit(): void {
		console.log('directive');
		
	}

}