import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PlayerListComponent } from './pages/player-list/player-list.component';
import { DashbroadComponent } from './pages/dashbroad/dashbroad.component';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
{path:'', pathMatch:'full', redirectTo:'/login'},
{path:'login',component:LoginComponent },
{path:'welcome',component:WelcomeComponent},
{path:'player',component:PlayerListComponent},
{path:'news',component:NewsComponent},
{path:'dashbroad', component:DashbroadComponent},
{path:'contact', component:ContactComponent},
{path:'user', component: UserListComponent}
//  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
