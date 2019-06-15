import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './modules/top-bar/components/top-bar.component';
import { AlertComponent} from './global/components/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
  	AppComponent,
  	TopBarComponent,  
    AlertComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
