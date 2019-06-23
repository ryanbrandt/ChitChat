import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-module.routing';
import { GroupSettingsComponent } from './components/group-settings.component';

@NgModule({
  declarations: [
  	SettingsComponent,
  	GroupSettingsComponent
  ],
  imports: [
  	SettingsRoutingModule,
    CommonModule
  ]
})
export class SettingsModule { }
