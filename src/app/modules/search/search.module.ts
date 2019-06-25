import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search.component';
import { SearchListComponent } from './components/search-list.component';
import { SearchRoutingModule } from './search-module.routing';

@NgModule({
  declarations: [ 
  	SearchComponent,
  	SearchListComponent 
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
  ],
  exports: [ SearchComponent ]
})
export class SearchModule { }
