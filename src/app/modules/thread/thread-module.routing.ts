import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadComponent } from './components/thread.component';

export const threadRoutes: Routes = [
	{ path: '', component: ThreadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(threadRoutes)],
  exports: [RouterModule]
})
export class ThreadRoutingModule { }