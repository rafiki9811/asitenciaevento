import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Eventos hoy',
      url: '/home',
      icon: 'calendar'
    },
    {
      title: 'Eventos pasados',
      url: '/list',
      icon: 'ios-calendar'
    },
    {
      title: 'Registros pendientes',
      url: '/list',
      icon: 'archive'
    },{
      title: 'Acerca de',
      url: '/list',
      icon: 'md-information-circle'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }
}
