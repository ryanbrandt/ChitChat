import { NgModule } from '@angular/core';
import { InboxRoutingModule } from './inbox-module.routing';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './components/inbox.component';

@NgModule({
  declarations: [InboxComponent],
  imports: [ 
    CommonModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
