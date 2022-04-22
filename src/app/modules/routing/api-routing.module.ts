import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ApiLayoutComponent } from '../components/api-layout/api-layout.component';
import { ApiContainerComponent } from './api-container/api-container.component';


const routes: Routes = [
	{
		path: '', component: ApiLayoutComponent, children: [
			{
				path: '',
				redirectTo: 'user',
				pathMatch: 'full'
			},
			{
				path: 'user',
				loadChildren: () => import('./user-api-routing.module').then(m => m.UserApiRoutingModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'admin',
				loadChildren: () => import('./admin-api-routing.module').then(m => m.AdminApiRoutingModule),
				canActivate: [AuthGuard]
			},
			{
				path: '**',
				redirectTo: 'errorPage'
			}
		]
	}
];


@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApiRoutingModule {
}
