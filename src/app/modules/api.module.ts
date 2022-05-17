import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {ApiLayoutComponent} from './components/api-layout/api-layout.component';
import {HeaderComponent} from './components/header/header.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {TabComponent} from './components/tab/tab.component';
import {SharedModule} from './shared/shared.module';
import {ApiRoutingModule} from './routing/api-routing.module';
import {NotificationsModule} from './notifications/notifications.module';
import {ApiContainerComponent} from './routing/api-container/api-container.component';
import {MainHeaderComponent} from './components/main-header/main-header.component';
import {OverlayModule} from './overlay/overlay.module';
import { DesktopMenuComponent } from './components/desktop-menu/desktop-menu.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';


@NgModule({
    declarations: [
        ApiLayoutComponent,
        HeaderComponent,
        NavigationComponent,
        TabComponent,
        ApiContainerComponent,
        MainHeaderComponent,
        DesktopMenuComponent,
        MobileMenuComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        ApiRoutingModule,
        // AuthModule,
        NotificationsModule,
        OverlayModule
    ],
    exports: []
})
export class ApiModule {
}
