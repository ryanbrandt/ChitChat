import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadComponent } from './components/thread.component';
import { ThreadRoutingModule } from './thread-module.routing';
@NgModule({
  declarations: [ ThreadComponent ],
  imports: [
    CommonModule,
    ThreadRoutingModule
  ]
})
export class ThreadModule { }
