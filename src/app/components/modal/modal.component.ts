import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { asist } from "../../../assets/data/asistentes";
import { EventsService, evento } from "../../services/events.service";

import { AlertController } from '@ionic/angular';
import { verify } from 'crypto';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  event = {} as evento;
  event2;

  event_asistentes;
  asistentes = asist;
  public user;
  constructor(
    private modal: ModalController,
    public alertController: AlertController,
    private params: NavParams,
    private barcodeScanner: BarcodeScanner,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    // console.log(this.asistentes);
    this.event2 = this.params.get('event');
    this.event = this.params.get('event');
    this.eventsService.getAsistentes(this.event.id).subscribe((asistentes) => {
      this.event_asistentes = asistentes;

    })

  }


  close() {
    this.modal.dismiss();
  }
  
  ver(){
    console.log(this.event_asistentes)
  }

  test(){

    const rafa ={
      qr:"qrafa",
      nombre:"rafa",
      foto:"assets/img/ninja.jpg"
  };

  

    this.eventsService.registerAsistente(rafa, this.event2.id).then(res => {
      console.log('se guardo rafa')
      this.alertController.create({
        header: 'Exito!',
        message: 'El usuario se ha registrado.',
        buttons: ['OK']
      }).then(alert => alert.present())

    }).catch(err => {
      console.log(err);
      
      // localStorage.setItem(this.user.qr, this.user);
      // console.log(localStorage.getItem(this.user.qr));

    })
  }

  scannerQr() {
    this.barcodeScanner.scan(
      {
        resultDisplayDuration: 0
      }
    ).then(data => {
      // console.log(data.text);
      this.asistentes.map(element => {
        if (element.qr == data.text) {
          this.user = element;
        }
      });

      if (this.user) {
        this.eventsService.registerAsistente(this.user, this.event2.id).then(res => {

          this.alertController.create({
            header: 'Exito!',
            message: 'El usuario se ha registrado.',
            buttons: ['OK']
          }).then(alert => alert.present())

        }).catch(err => {
          console.log(err);
          
          // localStorage.setItem(this.user.qr, this.user);
          // console.log(localStorage.getItem(this.user.qr));

        })
      } else {
        this.alertController.create({
          header: 'Denegado',

          message: 'El usuario no existe.',
          buttons: ['OK']
        }).then(alert => alert.present())
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

}
