import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserResolver } from "../users/services/user.resolver";

import { AdminApiContainerComponent } from "./admin-api-container/admin-api-container.component";
import { ApiContainerComponent } from "./api-container/api-container.component";


export const routes: Routes = [
	{
		path: '', component: ApiContainerComponent, children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			},
			{ 
				path: 'dashboard',
				loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{ 
				path: 'users',
				loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
			},
			{ 
				path: 'profile/:id',
				loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
				resolve: {
					user: UserResolver
				}
			},
			{ 
				path: 'settings',
				loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
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
export class AdminApiRoutingModule {}