import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search.component';
import { SearchRoutingModule } from './search-module.routing';

@NgModule({
  declarations: [ SearchComponent ],
  imports: [
    CommonModule,
    SearchRoutingModule,
  ],
  exports: [ SearchComponent ]
})
export class SearchModule { }
