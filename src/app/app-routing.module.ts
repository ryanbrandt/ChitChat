import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrComponent } from './global/components/err.component';

const routes: Routes = [
	{ path: '', loadChildren: './modules/login/login.module#LoginModule' },
	{ path: 'inbox', loadChildren: './modules/inbox/inbox.module#InboxModule' },
	{ path: 'err', component: ErrComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})


export class AppRoutingModule { }
