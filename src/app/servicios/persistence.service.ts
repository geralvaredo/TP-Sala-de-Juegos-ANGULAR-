import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Timestamp} from "rxjs";
import {Juego} from "../clases/juego";



@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private firestore: AngularFirestore) { }


  public crearJuego( juego: Juego ){
     return this.firestore.collection('juegos').add({
        juego: juego.nombre ,
       jugador: juego.jugador,
       resultado : juego.gano ,
       intentos : juego.intentos,
       puntaje: juego.puntaje
     }).catch(error => {
         console.log("Error al agregar una coleccion", error);
     });

  }

  public obtenerJuego(documentId : string){
    this.firestore.collection('juegos').get().subscribe();
  }



}
