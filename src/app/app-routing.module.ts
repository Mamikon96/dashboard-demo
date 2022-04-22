import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';



const routes: Routes = [
	
	{ path: 'errorPage', loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'logout', component: LogoutComponent },
	{
		path: '',
		loadChildren: () => import('./modules/api.module').then(m => m.ApiModule),
		// canActivate: [AuthGuard]
	},
	// { path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
