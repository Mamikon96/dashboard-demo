import { Component, Input, OnInit } from '@angular/core';
import { StoreTypeService } from './../../modules/users/services/store-type.service';

interface MenuItemOperation {
	id: string;
	value: string;
}

interface MenuItemOperations {
	[key: string]: MenuItemOperation[];
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

	@Input() title?: string;

	public selectedValue: string = '';
	public menuItems: string[] = ['Store'];
	public menuItemsOperations: MenuItemOperations = {
		'Store': [
			{ id: 'database', value: 'Database' },
			{ id: 'localstorage', value: 'Local Storage' }
		]
	};
	public isShownDropdown: boolean = false;

	private store: 'database' | 'localStorage' = 'database';

	constructor(private storeTypeService: StoreTypeService) { }

	ngOnInit(): void {
	}

	clickHandler(event: any, index: number): void {
		event.preventDefault();
		this.isShownDropdown = true;
	}

	selectOption(event: any): void {
		console.log(event);
		this.store = event.value;
		this.storeTypeService.setType({type: this.store});
	}

}
