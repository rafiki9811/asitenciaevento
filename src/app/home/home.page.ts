import { Component, OnInit } from '@angular/core';
import { EventsService } from "../services/events.service";
import { ModalController } from "@ionic/angular";
import {  ModalComponent } from "../components/modal/modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  eventos = [];

  constructor(
    private eventsService : EventsService,
     private  modal : ModalController
    ) {}

ngOnInit(){
  this.eventsService.getEvents().subscribe( events => {
    this.eventos = events;

    // console.log(this.eventos);
    
  })
}

openPage(event){
  // console.log(event);
  
  this.modal.create({
    component: ModalComponent,
    componentProps : {
      event : event
    }
  }).then((modal) => {
    modal.present();
  })
}




}
