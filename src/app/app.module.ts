import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { InboxComponent } from './inbox/inbox.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './services/data-service/data-service.service';
import { AlertService } from './services/alert-service/alert-service.service';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
  	AppComponent,
  	TopBarComponent, 
	  LoginComponent,
    RegisterComponent,
	  InboxComponent, 
    AlertComponent
  ],
  providers: [
    DataService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
