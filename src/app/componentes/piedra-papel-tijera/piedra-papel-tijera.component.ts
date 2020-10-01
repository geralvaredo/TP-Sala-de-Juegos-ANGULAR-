import { Component, OnInit } from '@angular/core';
import {JuegoPiedraPapelTijera} from '../../clases/juego-piedra-papel-tijera';
import {PersistenceService} from "../../servicios/persistence.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  mensaje: string ;
  mostrar: boolean ;
  resultados : boolean;
  ppt : JuegoPiedraPapelTijera;
  imagenEleccion : string ;
  imagenRival : string ;
  imgRock =  './assets/imagenes/rock.jpeg' ;
  imgPaper = './assets/imagenes/paper.jpeg' ;
  imgScissor = './assets/imagenes/scissors.jpeg';
  imgVersus = './assets/imagenes/versusChico.jpeg';


  constructor(private db: PersistenceService, private route: Router) {
    this.mostrar = true;
    this.resultados = false;
    this.ppt = new JuegoPiedraPapelTijera();
    this.ppt.partida = "";
  }

  ngOnInit() {
  }


  volver(){
    this.route.navigate(["Juegos"]);
  }

   jugar(){
     this.ppt.partida = "";
     this.resultados = false;
     this.mostrar = false;
    this.mensaje = "Elija una de las opciones";
   }

  opcion(event: Event){

      switch (event.srcElement.id){
        case 'rock': this.ppt.eleccion = 0; break;
        case 'paper': this.ppt.eleccion = 1; break;
        case 'scissor': this.ppt.eleccion = 2; break;
      }
      this.opcionRival();
      this.obtenerGanador();
      this.resultadosEnPantalla();

   }

   opcionRival(){
        this.ppt.rival = Math.floor( Math.random() * 3 ) ;
   }

   obtenerGanador(){
     this.ppt.verificacionResultado();

   }


   resultadosEnPantalla(){
     this.mostrar = true;
     this.resultados = true ;
     this.imgEleccion();
     this.imgRival();
     this.mensaje = this.ppt.mensaje;
     this.datosDeLaPartida();
   }

  datosDeLaPartida(){
    if(this.ppt.partida !== "E"){
      this.ppt.obtenerJugador();
      this.ppt.intentos = 1;
      (this.ppt.gano) ? this.ppt.puntaje = 1 : this.ppt.puntaje = 0;
      this.db.crearJuego(this.ppt);
    }
  }




   imgEleccion(){
     switch (this.ppt.eleccion){
       case 0: this.imagenEleccion = this.imgRock ; break;
       case 1: this.imagenEleccion = this.imgPaper ; break;
       case 2: this.imagenEleccion = this.imgScissor ; break;
     }
   }

   imgRival(){
     switch (this.ppt.rival){
       case 0: this.imagenRival = this.imgRock ; break;
       case 1: this.imagenRival = this.imgPaper ; break;
       case 2: this.imagenRival = this.imgScissor ; break;
     }
   }








}
