import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class StoreTypeService {

	public LOCAL_STORAGE: string = 'ls';
	public DATA_BASE: string = 'db';

	private type: StoreType = { type: 'database' };

	private storeTypeSubject: BehaviorSubject<StoreType> = new BehaviorSubject<StoreType>(this.type);
	public storeType$: Observable<StoreType> = this.storeTypeSubject.asObservable();

	constructor() {}

	setType(type: StoreType): void {
		this.type = type;
		this.storeTypeSubject.next(type);
	}
}

interface StoreType {
	type: 'localStorage' | 'database';
}