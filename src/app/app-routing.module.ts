import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { DashbroadComponent } from './pages/dashbroad/dashbroad.component';

const routes: Routes = [
{path:'', pathMatch:'full', redirectTo:'/login'},
{path:'login',component:LoginComponent },
{path:'welcome',component:WelcomeComponent},
{path:'player',component:PlayerListComponent},
{path:'dashbroad', component:DashbroadComponent}
//  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
