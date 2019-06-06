import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore/firestore";
import { firestore } from 'firebase';
import { map } from "Rxjs/operators";

export interface evento {
  id?: string
  fecha: any
  foto: string
  nombre: string
  ubicacion: string
  asistentes: []
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private bd: AngularFirestore) {
  
   }

  getEventsToday() {
    return this.bd.collection('evento').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as evento;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }
  getEventsPast() {
    return this.bd.collection('evento').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as evento;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getAsistToEvent() {

  }

  getEvent(id:string){
    return this.bd.collection('evento').doc(id).valueChanges();
  }

  registerAsistente(asistente: any, idEvent: string) {

    return new Promise((resolve, rejected) => {

      this.bd.collection('evento').doc(idEvent).collection('asistentes').doc(asistente.qr).set({
        nombre : asistente.nombre,
        foto : asistente.foto,
        
      }).then((res:any) => {
        resolve(res);
      }).catch( err => {
        rejected(err);
      })

    })

  }

  getAsistentes(idEvent:string){
    return this.bd.collection('evento').doc(idEvent).collection('asistentes').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

}
