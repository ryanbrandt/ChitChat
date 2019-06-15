import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './components/inbox.component';

export const inboxRoutes: Routes = [
	{ path: '', component: InboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(inboxRoutes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }