import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { StoreTypeService } from './services/store-type.service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

	public curStore!: string;

	private storeTypeSub!: Subscription;

	constructor(private storeTypeService: StoreTypeService) { }

	ngAfterViewInit(): void {
	}

	ngOnInit(): void {
		this.storeTypeSub = this.storeTypeService.storeType$.subscribe(data => {
			this.curStore = data.type;
		});
	}

	ngOnDestroy(): void {
		this.storeTypeSub && this.storeTypeSub.unsubscribe();
	}

}
