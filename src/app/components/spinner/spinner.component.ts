import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent implements OnInit {

	@Input() show: boolean | null = false;

	public color: ThemePalette = 'accent';
	public mode: ProgressSpinnerMode = 'indeterminate';
	public value: number = 50;

	constructor() { }

	ngOnInit(): void {
	}

}
