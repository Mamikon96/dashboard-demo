import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnChanges {

	@Input() tabs?: Tab[];

	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes.tabs.currentValue);
		
	}

	public trackByFn(index: number, item: any) {
		return index;
	}

}
