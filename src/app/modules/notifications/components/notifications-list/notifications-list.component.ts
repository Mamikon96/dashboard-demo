import { Component, ElementRef, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { Notification } from './../../models/notification.model';
import { EventEmitter } from '@angular/core';
import { NotificationsVisibilityService } from '../../services/notifications-visibility.service';

@Component({
	selector: 'app-notifications-list',
	templateUrl: './notifications-list.component.html',
	styleUrls: ['../../styles/notifications.sass']
})
export class NotificationsListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

	@Input() notifications!: Notification[];
	@Output() onNotificationsChange: EventEmitter<Notification[]> = new EventEmitter();
	@Output() onClose: EventEmitter<boolean> = new EventEmitter();

	@ViewChild('backdrop', {read: ElementRef}) backdropEl!: ElementRef;

	private unlistener!: () => void;


	constructor(private r2: Renderer2) { }


	/**
	 * Hooks
	 */

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.unlistener = this.r2.listen(this.backdropEl.nativeElement, 'click', this.closeHandler.bind(this));
	}

	ngOnDestroy(): void {
		this.unlistener();
	}


	/**
	 * Handlers
	 */

	deleteHandler(notification: Notification): void {
		console.log(notification);
		this.notifications = this.notifications.filter(n => n !== notification);
		this.onNotificationsChange.emit(this.notifications);
	}

	closeHandler(): void {
		this.onClose.emit(true);
	}

}
