import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, OnDestroy, AfterViewInit, Output } from '@angular/core';
import { Notification } from './../../models/notification.model';
import { EventEmitter } from '@angular/core';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input() notification!: Notification;
	@Output() deleteEvent: EventEmitter<Notification> = new EventEmitter();

	@ViewChild('closeBtn', {read: ElementRef}) closeBtnEl!: ElementRef;

	private unlistener!: () => void;


	constructor(private r2: Renderer2) { }


	ngAfterViewInit(): void {
		this.unlistener = this.r2.listen(this.closeBtnEl.nativeElement, 'click', this.closeHandler.bind(this));
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.unlistener();
	}

	public closeHandler(): void {
		this.deleteEvent.emit(this.notification);
	}

}
