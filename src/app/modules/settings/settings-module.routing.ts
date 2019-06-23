import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { GroupSettingsComponent } from './components/group-settings.component';

export const settingsRoutes: Routes = [
	{ path: '', component: SettingsComponent },
	{ path: 'manage-group', component: GroupSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }