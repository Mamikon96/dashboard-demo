import { Component, Input, OnInit, OnDestroy, Renderer2, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert, AlertService, AlertType } from '../../services/alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy, OnChanges {

	@Input() alert!: Alert;
	@Input() alertPosition!: string;

	@ViewChild('alertRef', {read: ElementRef}) alertRef!: ElementRef;

	public isHidden: boolean = false;


	constructor(private alertService: AlertService,
				private r2: Renderer2,
				private el: ElementRef) { }
				
	ngOnChanges(changes: SimpleChanges): void {
		this.r2.setStyle(this.el.nativeElement.children[0], 'top', changes.alertPosition.currentValue);
		
	}

	ngOnInit(): void {
		this.r2.setStyle(this.el.nativeElement, 'top', this.alertPosition);
	}

	ngOnDestroy(): void {
		// this.alertSub && this.alertSub.unsubscribe();
	}

	public hideAlert(): void {
		this.isHidden = true;
	}

}
