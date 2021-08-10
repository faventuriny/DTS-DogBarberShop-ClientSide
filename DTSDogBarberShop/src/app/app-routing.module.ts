import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { CreateNewAccountComponent } from './components/auth/create-new-account/create-new-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { WaitingListResolver } from './services/waiting-list.resolver';

const routes: Routes = [
  {path: '', redirectTo: '/waiting-list',  pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'create-new-account', component: CreateNewAccountComponent },
  {
    path: 'waiting-list',
    component: WaitingListComponent,
    canActivate: [AuthGuard],
    resolve:{WaitingListResolver}
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
