import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { DashbroadComponent } from './pages/dashbroad/dashbroad.component';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
{path:'', pathMatch:'full', redirectTo:'/login'},
{path:'login',component:LoginComponent },
  { path: 'welcome', component: WelcomeComponent , canActivate: [AuthGuard] },
  { path: 'player', component: PlayerListComponent, canActivate: [AuthGuard] },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'dashbroad', component: DashbroadComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard] },
//  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
