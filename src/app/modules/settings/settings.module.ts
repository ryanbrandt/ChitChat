import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-module.routing';
import { GroupSettingsComponent } from './components/group-settings.component';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [
  	SettingsComponent,
  	GroupSettingsComponent,
  ],
  imports: [
  	SettingsRoutingModule,
    SearchModule,
    CommonModule
  ]
})
export class SettingsModule { }
