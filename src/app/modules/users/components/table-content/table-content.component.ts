import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataSource } from '../../models/user-data-source.model';
import { User, UsersService } from '../../services/users.service';

@Component({
	selector: 'app-table-content',
	templateUrl: './table-content.component.html',
	styleUrls: ['./table-content.component.sass']
})
export class TableContentComponent implements OnInit, AfterViewInit {

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	
	public displayedColumns: string[] = ['select', 'position', 'name', 'service', 'traffic'];
	public dataSource: MatTableDataSource<UserDataSource>;
	public selection = new SelectionModel<UserDataSource>(true, []);
	public _isDisabledDelete: boolean = true;
	public _isDisabledEdit: boolean = true;

	private users: User[] = [];

	constructor(private usersService: UsersService) {
		this.dataSource = new MatTableDataSource<UserDataSource>();
	}

	ngOnInit(): void {
		this.usersService.getUsers().subscribe((data: User[]) => {
			this.users = [...data];
			let usersTemp: UserDataSource[] = [];
			for (let i = 0; i < data.length; i++) {
				for (let j = 0; j < data[i].services?.length; j++) {
					usersTemp.push({
						position: i + 1,
						name: data[i].name!,
						service: data[i].services[j].name,
						traffic: data[i].services[j].traffic,
						usedTraffic: data[i].services[j].usedTraffic
					});
				}
			}
			this.updateTable(usersTemp);
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	updateTable(data: UserDataSource[]): void {
		this.dataSource.data = data;
	}

	toggleAllRows(): void {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
		this.updateButtonsStates(this.selection.selected.length);
	}

	toggleRow(row: UserDataSource): void {
		this.selection.toggle(row);
		this.updateButtonsStates(this.selection.selected.length);
	}

	toggle(row?: UserDataSource): void {
		if (row) {
			this.selection.toggle(row);
		} else {
			this.isAllSelected() ?
				this.selection.clear() :
				this.dataSource.data.forEach(row => this.selection.select(row));
		}
		this.updateButtonsStates(this.selection.selected.length);
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	checkboxLabel(row?: UserDataSource): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

	private updateButtonsStates(event: number): void {
		if (event == 0) {
			this._isDisabledEdit = true;
			this._isDisabledDelete = true;
		} else if (event > 1) {
			this._isDisabledEdit = true;
			this._isDisabledDelete = false;
		} else {
			this._isDisabledEdit = false;
			this._isDisabledDelete = false;
		}
	}

}
