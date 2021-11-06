import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/modules/alert/services/alert.service';

@Component({
	selector: 'app-table-header',
	templateUrl: './table-header.component.html',
	styleUrls: ['./table-header.component.sass']
})
export class TableHeaderComponent implements OnInit {

	constructor(private alert: AlertService) { }

	ngOnInit(): void {
	}

	clickHandler(text: string): void {
		this.alert.danger(text);
	}

}
