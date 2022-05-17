import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService<T> {

    public setItem(key: string, value: T): void {
        if (key !== "") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    public getItem(key: string): T | null {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);
    }
}
