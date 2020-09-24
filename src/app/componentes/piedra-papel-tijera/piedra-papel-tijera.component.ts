import { Component, OnInit } from '@angular/core';
import {JuegoPiedraPapelTijera} from '../../clases/juego-piedra-papel-tijera';

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


  constructor() {
    this.mostrar = true;
    this.resultados = false;
    this.ppt = new JuegoPiedraPapelTijera();
  }

  ngOnInit() {
  }

   jugar(){
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
     console.log("mi jugada: " + this.ppt.eleccion);
     console.log("jugada Rival: " + this.ppt.rival);
     console.log("mensaje" + this.ppt.mensaje);

   }


   resultadosEnPantalla(){
     this.mostrar = true;
     this.resultados = true ;
     this.imgEleccion();
     this.imgRival();
     this.mensaje = this.ppt.mensaje;

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
