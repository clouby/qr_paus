import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

import { QuestionService } from './services/question.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MomentModule } from 'ngx-moment';
import { AngularFireModule } from 'angularfire2';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import 'hammerjs';

import { QuestionComponent } from './components/question/question.component';
import { AnswerComponent } from './components/answer/answer.component';
import { SignInComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from "./components/auth/signup/signup.component";
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionFormComponent } from './components/question/question-form/question-form.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


import { Routing } from "./app.routing";
import { HttpModule } from '@angular/http';
import { ZoneService } from './services/zone.service';
import { ZonesComponent } from './components/zones/zones.component';
import { SocketZone } from './services/zone.socket.service';
import { QRCodeModule } from 'angularx-qrcode';
import { ZonesQrComponent } from './components/zones/zones-qr/zones-qr.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

const congigSocket: SocketIoConfig = { url: 'http://localhost:3000' }

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    AnswerComponent,
    SignInComponent,
    SignupComponent,
    QuestionListComponent,
    QuestionFormComponent,
    ZonesComponent,
    ZonesQrComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    Routing,
    MomentModule,
    QRCodeModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    InfiniteScrollModule,
    SocketIoModule.forRoot(congigSocket)
  ],
  providers: [AuthService, QuestionService, ZoneService, SocketZone],
  bootstrap: [AppComponent]
})
export class AppModule { }
