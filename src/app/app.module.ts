import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './modules/top-bar/components/top-bar.component';
import { SearchModule } from './modules/search/search.module';
import { AlertComponent} from './global/components/alert.component';
import { UserService } from './global/services/user-service.service';
import { AuthInterceptor } from './global/services/http.interceptor';
import { ErrComponent } from './global/components/err.component';
import * as bootstrap from 'bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SearchModule
  ],
  declarations: [
  	AppComponent,
  	TopBarComponent,  
    AlertComponent,
    ErrComponent
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
