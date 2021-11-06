import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApiLayoutComponent } from '../components/api-layout/api-layout.component';
import { AuthGuard } from 'src/app/services/auth.guard';


const routes: Routes = [
	{
		path: '', component: ApiLayoutComponent, children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{ 
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
				canActivate: [AuthGuard]
			},
			{ 
				path: 'users',
				loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
				canActivate: [AuthGuard]
			},
			{ 
				path: 'errorPage',
				loadChildren: () => import('../page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
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
export class ApiRoutingModule { }
