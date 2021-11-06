import {
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef,
	OnDestroy,
	Input,
	SimpleChange
} from '@angular/core';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { Alert, AlertService } from '../../services/alert.service';
import { AlertsVisibilityService } from '../../services/alerts-visibility.service';
import { AlertComponent } from './../alert/alert.component';

@Component({
	selector: 'app-alert-placeholder',
	templateUrl: './alert-placeholder.component.html',
	styleUrls: ['./alert-placeholder.component.sass']
})
export class AlertPlaceholderComponent implements OnInit, OnDestroy {

	@Input() delay: number = 3000;
	@Input() deleteDelay: number = 800;

	@ViewChild("alertContainer", { read: ViewContainerRef }) container!: ViewContainerRef;

	public componentRefs: ComponentRef<AlertComponent>[] = [];
	private alertSub!: Subject<Alert>;
	private alertsVisibilitySub!: Subject<boolean>;
	private alertComponentsMap: Map<Alert, ComponentRef<AlertComponent>> = new Map();


	constructor(public alertsVisibility: AlertsVisibilityService,
				private alertService: AlertService,
				private resolver: ComponentFactoryResolver
	) { }

	ngOnInit(): void {
		this.alertSub = this.alertService.alert$;
		this.alertsVisibilitySub = this.alertsVisibility.isShownAlerts$;//.subscribe((isShown: boolean) => {});

		combineLatest(
			this.alertSub,
			this.alertsVisibilitySub
		).subscribe(([alert, isShown]) => {
			console.log(isShown, alert);
			
			if (isShown) {
				this.handleAlertEvent(alert);
			}
		});
	}

	ngOnDestroy(): void {
		// this.componentRef.destroy();
		this.alertSub && this.alertSub.unsubscribe();
	}

	private handleAlertEvent(alert: Alert): void {
		const componentRef = this.createAlert(alert);
		this.registerHideHandler(componentRef);
		// this.registerDeleteHandler(componentRef);
	}

	private registerHideHandler(componentRef: ComponentRef<AlertComponent>): void {
		const hideTimeout = setTimeout(() => {
			clearTimeout(hideTimeout);
			// const componentRef = this.alertComponentsMap.get(alert);
			const firstComponentRef = this.componentRefs[0];
			if (firstComponentRef === componentRef) {
				firstComponentRef?.instance.hideAlert();
				this.registerDeleteHandler(componentRef);
			} else {
				this.registerHideHandler(componentRef);
			}
		}, this.delay / 2);
	}

	private registerDeleteHandler(componentRef: ComponentRef<AlertComponent>): void {
		const deleteTimeout = setTimeout(() => {
			clearTimeout(deleteTimeout);
			// const componentRef = this.alertComponentsMap.get(alert);
			const firstComponentRef = this.componentRefs[0];
			if (firstComponentRef === componentRef) {
				componentRef?.destroy();
				this.updatePositions();
				this.componentRefs.shift();
			} else {
				this.registerDeleteHandler(componentRef);
			}
			// this.alertComponentsMap.delete(alert);
			// this.componentRef.destroy();
		}, this.deleteDelay);
	}

	private updatePositions(): void {
		// this.componentRefs.forEach(componentRef => {
		// 	componentRef.instance.alertPosition = `${this.componentRefs.length * 60}px`;
		// 	const changes = {
		// 		alertPosition: new SimpleChange(
		// 				`${(this.componentRefs.length + 1) * 60}px`,
		// 				`${this.componentRefs.length * 60}px`,
		// 				false
		// 			)
		// 	};
		// 	componentRef.instance.ngOnChanges(changes);
		// });

		for (let i = 0; i < this.componentRefs.length; i++) {
			// this.componentRefs[i].instance.alertPosition = `${i * 60}px`;
			const changes = {
				alertPosition: new SimpleChange(
						`${(i) * 60}px`,
						`${(i - 1) * 60}px`,
						false
					)
			};
			this.componentRefs[i].instance.ngOnChanges(changes);
		}
	}

	private createAlert(alert: Alert): ComponentRef<AlertComponent> {
		// this.container.clear();
		const factory: ComponentFactory<AlertComponent> = this.resolver.resolveComponentFactory(AlertComponent);
		const componentRef: ComponentRef<AlertComponent> = this.container.createComponent(factory);

		componentRef.instance.alert = alert;
		componentRef.instance.alertPosition = `${this.componentRefs.length * 60}px`;

		const changes = {
			alertPosition: new SimpleChange(
					`${(this.componentRefs.length) * 60}px`,
					`${this.componentRefs.length * 60}px`,
					true
				)
		};
		componentRef.instance.ngOnChanges(changes);

		this.componentRefs.push(componentRef);
		// this.alertComponentsMap.set(alert, componentRef);
		return componentRef;
	}

}
