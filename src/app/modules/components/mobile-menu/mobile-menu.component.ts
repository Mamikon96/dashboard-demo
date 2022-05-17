import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {OverlayService} from '../../overlay/services/overlay.service';
import {NavigationMenuManagerService} from '../../../services/navigation-menu-manager.service';

@Component({
	selector: 'app-mobile-menu',
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.sass']
})
export class MobileMenuComponent implements OnInit, OnDestroy {

	@ViewChild('navigationMenuButton') navigationMenuButtonRef!: ElementRef;


	constructor(public overlayService: OverlayService,
	            public navMenuManager: NavigationMenuManagerService) {
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		// this.overlayService.showOverlay(false);
		this.navMenuManager.showNavMenu(false);
	}


	public menuButtonHandler(): void {
		// console.log(this.navigationMenuButtonRef.nativeElement.checked);
		// this.overlayService.showOverlay(this.navigationMenuButtonRef.nativeElement.checked);
		this.navMenuManager.showNavMenu(this.navigationMenuButtonRef.nativeElement.checked);
	}

}
