import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';


export interface DynamicMap {
	[key: string]: any;
}

export const SIGN_TYPE: DynamicMap = {
	0: 'signIn',
	1: 'signUp'
};


@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {

	public _signType!: string;

	public _tabsTitles: string[] = [
		'Sign In',
		'Sign Up'
	];

	constructor() { }

	ngOnInit(): void {
		this._signType = SIGN_TYPE[0];
	}

	public handleTabClick(event: MatTabChangeEvent): void {
		console.log(SIGN_TYPE[event.index]);
		this._signType = SIGN_TYPE[event.index];
	}

}
