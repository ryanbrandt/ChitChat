import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-module.routing';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

@NgModule({
  declarations: [
	LoginComponent,
	RegisterComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
