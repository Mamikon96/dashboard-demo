import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Tab } from 'src/app/models/tab.model';
import { TabsService } from '../../../services/tabs.service';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.sass']
})
export class TabComponent implements OnInit {

	@Input() tab!: Tab;
	@Output() onHover: EventEmitter<string> = new EventEmitter<string>();

	constructor(private tabsService: TabsService) { }

	ngOnInit(): void {
	}

	@HostListener('click')
	hoverHandler(): void {
		this.tabsService.updateActiveTab(this.tab.path);
	}

}
