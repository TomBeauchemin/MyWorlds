import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { ContactPage } from '../pages/contact/contact';
import { CreateEventPage } from '../pages/create-event/create-event';
import { HomePage } from '../pages/home/home';
import { GroupPage } from '../pages/group/group';
import { EventPage } from '../pages/event/event';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { GroupData } from '../providers/group-data';
import { LocationTracker } from '../providers/location-tracker';
import { RegisterPage } from '../pages/register/register';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { MapViewPage } from '../pages/map-view/map-view';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AutocompletePage,
    ContactPage,
    HomePage,
    GroupPage,
    CreateEventPage,
    EventPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    MapViewPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AutocompletePage,
    ContactPage,
    HomePage,
    GroupPage,
    CreateEventPage,
    EventPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    MapViewPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, GroupData, LocationTracker]
})
export class AppModule {}
