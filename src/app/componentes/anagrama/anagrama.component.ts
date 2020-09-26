import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JuegoAnagrama} from '../../clases/juego-anagrama';
import {isBoolean} from 'util';
import {element} from 'protractor';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAnagrama;
  message: string;
  palabra: string;
  hideComponent : boolean;
  hideTag : boolean ;
  hideRespuesta: boolean;
  hideJugar: boolean;
  resultado : boolean;


  ngOnInit() {
  }

  constructor() {
    this.intentos() ;
  }

  generarPalabra(){
    this.nuevoJuego.respuesta != "" ?  this.limpiarCampos() : "";
     this.ocultarAlGenerarPalabra();
     this.nuevoJuego.obtenerAnagrama();
    this.palabra = this.nuevoJuego.anagrama;

  }

   ocultarAlGenerarPalabra(){
     this.hideComponent = true;
     this.hideJugar = true ;
     this.hideRespuesta = false ;
   }


  public respuesta() {
    this.nuevoJuego.counter++;
    console.log("ronda: " + this.nuevoJuego.counter);
    if(this.nuevoJuego.counter == 5){
      this.rondaCerrada();
    }
    else{
      this.nuevoJuego.verificar() ? this.resultadoVerificado() : "";
      this.generarPalabra();
    }

  }

  resultadoVerificado(){
    this.nuevoJuego.condicion();
    console.log(this.nuevoJuego.intentos);
    this.enviarJuego.emit(this.nuevoJuego);
    this.nuevoJuego.anagrama = '';
    this.hideTag = false;
    this.nuevoJuego.respuesta = "";
  }

  rondaCerrada(){
    this.resultado =  this.evaluarRondas();
    this.resultado ? this.mostrarMensaje("Ganador", this.resultado) :  this.mostrarMensaje("Perdedor", this.resultado);
   }

   evaluarRondas(){
   this.nuevoJuego.intentos >= 3 ?  this.nuevoJuego.gano = true : this.nuevoJuego.gano = false;
   return this.nuevoJuego.gano;
   }


  mostrarMensaje(mensaje:string ,ganador: boolean) {
    this.message = mensaje;
    var x = document.getElementById("snackbar");
    ganador ? x.className = "neon-verde" :  x.className = "neon-rojo";
    var modelo=this;
    setTimeout(function(){
      x.className = x.className.replace("show", "");
       modelo.intentos();
    }, 500);

  }

   intentos(){
     this.nuevoJuego = new JuegoAnagrama();
     this.hideComponent = false;
     this.hideJugar = false ;
     this.hideTag = true;
     this.hideRespuesta = true;
   }

   limpiarCampos(){
     this.nuevoJuego.respuesta = "";
     this.nuevoJuego.gano = null;
     var x = document.getElementById("snackbar");
     x.className = "";
     this.message = "";
   }






}
