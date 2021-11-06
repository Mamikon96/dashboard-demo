import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

	public _title = 'Sign Up';
	public _form!: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.initForm();
	}

	public registration(): void {}

	private initForm(): void {
        this._form = this.fb.group({
            username: ['', []],
            password: ['', []],
            email: ['', []]
        });
    }

}
