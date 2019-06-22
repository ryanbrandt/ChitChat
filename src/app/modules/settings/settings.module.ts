import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings.component';
import { SettingsRoutingModule } from './settings-module.routing';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
  	SettingsRoutingModule,
    CommonModule
  ]
})
export class SettingsModule { }
