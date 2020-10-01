import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Juego} from "../clases/juego";
import * as firebase from "firebase";
import {Jugador} from "../clases/jugador";



@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(private firestore: AngularFirestore) { }


  public crearJuego( juego: Juego ){
     return this.firestore.collection('juegos').add({
        nombre: juego.nombre ,
       jugador: juego.jugador,
       resultado : juego.gano ,
       intentos : juego.intentos,
       puntaje: juego.puntaje,
       fecha: firebase.firestore.Timestamp.now().toDate()
     }).catch(error => {
         console.log("Error al agregar una coleccion de juegos", error);
     });

  }


  public obtenerJuego(juegos : string){
     return  this.firestore.collection(juegos).valueChanges();
  }

  public crearJugadores(jugador : Jugador){
    return this.firestore.collection('jugadores').add({
      nombre : jugador.nombre ,
      apodo : jugador.apodo ,
      avatar : jugador.avatar ,
      sexo  :   jugador.sexo ,
      terminos : jugador.terminos
    }).catch(error => {
      console.log("Error al agregar una coleccion de jugadores", error);
    });
  }

  public obtenerJugadores(jugador: string){
    return  this.firestore.collection(jugador).valueChanges();
  }



}
