import {Component, HostListener, Input, OnInit} from '@angular/core';
import {OverlayService} from '../../services/overlay.service';

@Component({
    selector: 'app-overlay',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.sass']
})
export class OverlayComponent implements OnInit {

    @Input() showOverlay = false;

    constructor(public overlayService: OverlayService) {
    }

    ngOnInit(): void {
    }

    @HostListener('click', ['$event'])
    public overlayClickHandler(): void {
        this.overlayService.showOverlay(false);
    }

}
