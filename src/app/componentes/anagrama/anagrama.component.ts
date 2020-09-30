import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {JuegoAnagrama} from '../../clases/juego-anagrama';
import {isBoolean} from 'util';
import {element} from 'protractor';
import {PersistenceService} from "../../servicios/persistence.service";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  anagrama: JuegoAnagrama;
  message: string;
  palabra: string;
  hideComponent : boolean;
  hideTag : boolean ;
  hideRespuesta: boolean;
  hideJugar: boolean;
  resultado : boolean;
  puntaje : number;


  ngOnInit() {
  }

  constructor(private db: PersistenceService) {
    this.intentos() ;
  }

  generarPalabra(){
    this.anagrama.respuesta != "" ?  this.limpiarCampos() : "";
     this.ocultarAlGenerarPalabra();
     this.anagrama.obtenerAnagrama();
    this.palabra = this.anagrama.palabra;

  }

   ocultarAlGenerarPalabra(){
     this.hideComponent = true;
     this.hideJugar = true ;
     this.hideRespuesta = false ;
   }


  public respuesta() {
    this.anagrama.counter++;
    console.log("ronda: " + this.anagrama.counter);
    if(this.anagrama.counter == 5){
      this.rondaCerrada();
      setTimeout(() => this.reiniciar(), 4000);
    }
    else{
      this.anagrama.verificar() ? this.resultadoVerificado() : "";
      this.generarPalabra();
    }

  }

  reiniciar(){
    location.reload();
  }


  resultadoVerificado(){
    this.anagrama.condicion();
    this.enviarJuego.emit(this.anagrama);
    this.anagrama.palabra = '';
    this.hideTag = false;
    this.anagrama.respuesta = "";
  }



  rondaCerrada(){
    this.resultado =  this.evaluarRondas();
    this.resultado ? this.mostrarMensaje("Ganador", this.resultado) :  this.mostrarMensaje("Perdedor", this.resultado);
    console.log(this.anagrama);
    this.datosDeLaPartida();
    this.db.crearJuego(this.anagrama);
   }

    datosDeLaPartida(){
    this.anagrama.obtenerJugador();
    this.puntaje =  this.anagrama.gano ? 5 : 1 ;
    this.anagrama.puntaje = this.anagrama.intentos * this.puntaje;
    this.db.crearJuego(this.anagrama);
    this.enviarJuego.emit(this.anagrama);
  }



  evaluarRondas(){
   this.anagrama.intentos >= 3 ?  this.anagrama.gano = true : this.anagrama.gano = false;
   return this.anagrama.gano;
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
     this.anagrama = new JuegoAnagrama();
     this.hideComponent = false;
     this.hideJugar = false ;
     this.hideTag = true;
     this.hideRespuesta = true;
   }






   limpiarCampos(){
     this.anagrama.respuesta = "";
     this.anagrama.gano = null;
     var x = document.getElementById("snackbar");
     x.className = "";
     this.message = "";
   }






}
