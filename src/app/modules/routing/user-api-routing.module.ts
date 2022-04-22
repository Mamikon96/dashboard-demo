import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserResolver } from "../users/services/user.resolver";
import { ApiContainerComponent } from "./api-container/api-container.component";
import { UserApiContainerComponent } from "./user-api-container/user-api-container.component";


export const routes: Routes = [
	{
		path: '', component: ApiContainerComponent, children: [
			{
				path: '',
				redirectTo: 'profile',
				pathMatch: 'full'
			},
			{ 
				path: 'profile',
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


// export const routes: Routes = [
// 	{
// 		path: '',
// 		component: UserApiContainerComponent
// 	}
// ];


@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserApiRoutingModule {
}