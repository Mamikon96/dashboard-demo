import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UsersComponent } from './modules/users/users.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
	
	{ path: 'errorPage', loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'logout', component: LogoutComponent },
	{
		path: 'api',
		loadChildren: () => import('./modules/api.module').then(m => m.ApiModule),
		canActivate: [AuthGuard]
	},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
