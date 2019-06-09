import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { InboxComponent } from './inbox/inbox.component';

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
	  InboxComponent	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
