import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";
import { ModalComponent } from "./components/modal/modal.component";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';




@NgModule({
  declarations: [AppComponent, ModalComponent],
  entryComponents: [ModalComponent],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCQY_K8c5igbXMf8z79bw4QkJyWJeZL0zU",
      authDomain: "control-de-asistencia-cbdec.firebaseapp.com",
      databaseURL: "https://control-de-asistencia-cbdec.firebaseio.com",
      projectId: "control-de-asistencia-cbdec",
      storageBucket: "control-de-asistencia-cbdec.appspot.com",
      messagingSenderId: "514459884333",
      appId: "1:514459884333:web:985614da39c1f6c0"
    }),
    AngularFirestoreModule.enablePersistence({synchronizeTabs:false}),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
