import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//primeNG 會用到????
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//import { LocationStrategy, HashLocationStrategy ,PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';//,
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { environment } from './../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';

//========= custom module ============
import { PipeModule } from'../../projects/ogcat-tool-package/src/lib/_pipe/pipe.module';
import { OgcatToolPackageModule } from '../../projects/ogcat-tool-package/src/lib/ogcat-tool-package.module';//如果只使用到 function, factory 而沒使用到 component 則不需要 import


//======  component  ============
  import { RouteUserComponent } from './sub-router/route-user/route-user.component';
  //layout
  import { AppComponent } from './app.component';
  import { HeaderComponent } from './layout/header/header.component';
  import { FooterComponent } from './layout/footer/footer.component';
  
//auth 驗證組件
import { authGuard } from './../authGuard';

//primeNG
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
//import { ToastModule } from 'primeng/toast';


//customer-tool
import { Calendar } from './_factory/calendar';
import { PhotoComponent } from './photo/photo.component';
import { CreateOrderComponent } from './web-component/create-order/create-order.component';
import { OrderListComponent } from './web-component/order-list/order-list.component';
import { MemberComponent } from './web-component/order-list/member/member.component';
import { TotalComponent } from './web-component/order-list/total/total.component';


let i18nurl= environment.i18n;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, i18nurl, ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RouteUserComponent,
    CreateOrderComponent,
    OrderListComponent,
    MemberComponent,
    TotalComponent
  ],
  imports: [
    ButtonModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    OgcatToolPackageModule,
    PipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,//useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [authGuard, Calendar ],
  bootstrap: [AppComponent]
})
export class AppModule { }
