import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Alert, AlertType} from '../../alert/services/alert.service';
import {AlertsStoreService} from '../../alert/services/alerts-store.service';
import {Notification} from '../../notifications/models/notification.model';
import {NotificationsVisibilityService} from '../../notifications/services/notifications-visibility.service';
import {StoreTypeService} from '../../users/services/store-type.service';
import {OverlayService} from '../../overlay/services/overlay.service';
import {Subscription} from 'rxjs';
import {PlatformType} from '../../shared/directives/screen-width-listener.directive';
import {PlatformService} from '../../../services/platform.service';

interface MenuItemOperation {
    id: string;
    value: string;
}

interface MenuItemOperations {
    [key: string]: MenuItemOperation[];
}


@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.sass']
})
export class MainHeaderComponent implements OnInit {

    @Input() title?: string;
    @Output() menuButtonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('navigationMenuButton') navigationMenuButtonRef!: ElementRef;
    @ViewChild('burgerMenu') burgerMenuEl!: ElementRef;
    @ViewChild('menu') menuEl!: ElementRef;

    public selectedValue = '';
    public menuItems: string[] = ['Store'];
    public menuItemsOperations: MenuItemOperations = {
        Store: [
            {id: 'database', value: 'Database'},
            {id: 'localstorage', value: 'Local Storage'}
        ]
    };
    public useMobileNavigation = false;
    public useTabletNavigation = false;
    public useDesktopNavigation = true;

    public isShownDropdown = false;
    public isShownNotifications = false;
    public alerts: Alert[] = [];
    public notifications: Notification[] = [];

    private store: 'database' | 'localStorage' = 'database';

    public overlaySub!: Subscription;

    public get showNav(): boolean {
	    console.log(this.burgerMenuEl);
	    return false;
    }


    constructor(private storeTypeService: StoreTypeService,
                public alertsStore: AlertsStoreService,
                public notificationsVisibility: NotificationsVisibilityService,
                public overlayService: OverlayService,
                public platform: PlatformService,
                private r2: Renderer2) {
    }


    /**
     * Hooks
     */

    ngOnInit(): void {
        this.alertsStore.alerts$.subscribe((alerts: Alert[]) => {
            this.alerts = alerts;
            this.notifications = this.alerts.map((alert: Alert) => ({
                type: alert.type,
                text: alert.text,
                color: alert.type
            }));
        });
    }


    /**
     * Handlers
     */

    public storeClickHandler(event: any, index: number): void {
        event.preventDefault();
        this.isShownDropdown = true;
    }

    public selectStoreOption(event: any): void {
        console.log(event);
        this.store = event.value;
        this.storeTypeService.setType({type: this.store});
    }

    public notificationsClickHandler(event: any): void {
        event.preventDefault();
        this.isShownNotifications = !this.isShownNotifications;
    }

    public notificationCloseHandler(event: boolean): void {
        this.isShownNotifications = !event;
    }

    public notificationsChangeHandler(notifications: Notification[]): void {
        const alerts: Alert[] = [];
        notifications.forEach(n => {
            const alert: Alert = this.notificationToAlert(n);
            alerts.push(alert);
        });
        this.alertsStore.replace(alerts);
    }


    /**
     * Methods
     */

    private notificationToAlert(notification: Notification): Alert {
        const alert: Alert = {
            type: notification.type as AlertType,
            text: notification.text
        };
        return alert;
    }

}
