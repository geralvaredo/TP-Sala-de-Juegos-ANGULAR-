import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';
import {Subscription} from 'rxjs';
import {PersistenceService} from "../../servicios/persistence.service";

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  agilidad : JuegoAgilidad;
  ocultarVerificar: boolean;
  ocultarNumeros: boolean;
  btnArranque: boolean;
  btnContador: boolean;
  btnFin: boolean;
  Tiempo: number;
  repetidor:any;
  nroRonda : number;
  mensaje: string;
  mostrarMensaje: boolean;
  resultadoCorrecto: string;
  jugador : string ;
  private subscription: Subscription;

  ngOnInit() {
  }

   enviarJugada(juego: JuegoAgilidad){
    this.enviarJuego.emit(juego);
   }

   constructor(private db: PersistenceService) {
     this.ocultarVerificar=true;
     this.inicializaRonda();
     this.Tiempo=15;
     this.ocultarNumeros = true;
     this.btnArranque = false;
     this.btnContador = false;
     this.btnFin = true ;
    this.agilidad = new JuegoAgilidad();
     this.mostrarMensaje = false;
  }

  inicializaRonda(){
    this.nroRonda = 1;
  }

   NuevoJuego() {
       if(this.nroRonda == 1){
         this.agilidad.puntajeInicial();
       }
      this.ocultarVerificar=false;
      this.btnArranque = true;
      this.btnContador = true;
      this.mostrarMensaje = false;
      this.agilidad.operacionAleatoria();
      this.agilidad.resultadoUsuario = null;
      this.limpiarRepetidor();
  }

  datosDeLaPartida(intentos: number){
    this.agilidad.jugador = this.obtenerJugador();
    this.agilidad.intentos = intentos;
    this.db.crearJuego(this.agilidad);
    this.enviarJuego.emit(this.agilidad);
  }



  responder(){
   this.verificarValores();
   clearInterval(this.repetidor);
   this.Tiempo=15;
   this.verificacionDeResultado();
   if(this.nroRonda == 6){
     this.btnContador = true;
     this.btnFin = false;
     this.agilidad.obtenerPartida();
     console.log(this.agilidad);
     this.inicializaRonda();
     this.datosDeLaPartida(5);
     this.condicion();
     }
   }

  deNuevo(){
    location.reload();
  }

  obtenerJugador(){
    return this.jugador = sessionStorage.getItem('usuario');
  }

   condicion(){
      this.mensaje = "";
    if (this.agilidad.gano){
      this.divVerde();
    }else{
      this.divRojo();
    }
      this.mostrarMensaje = true;
   }

   divVerde(){
     this.verde();
     this.mensaje = "GANASTE!!" ;
   }

   divRojo(){
     this.rojo();
     this.mensaje = "PERDISTE!!";
   }

   rojo(){
     let div = document.getElementById("divMensaje") as unknown as any;
     div.className = 'partidaPerdida';
   }

   verde(){
     let div = document.getElementById("divMensaje") as unknown as any;
     div.className = 'partidaGanada';
   }

  limpiarRepetidor(){
    this.repetidor = setInterval(()=>{
      this.Tiempo--;
      //console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.responder();
        this.ocultarVerificar=true;
        this.Tiempo=15;
      }
    }, 1000);
  }


  verificarValores(){
    this.mensaje = "";
    this.ocultarVerificar=true;
    this.btnArranque = false;
    this.btnContador = false;

  }

  verificacionDeResultado(){
    if(this.agilidad.verificacionResultado()){
      this.respuestaAcertada();
    } else{
      this.respuestaInvalida();
    }
    this.mostrarMensaje = true;
    this.nroRonda++;
  }

   respuestaAcertada(){
     this.agilidad.obtenerPuntaje(true);
     this.verde();
     this.mensaje = "Respuesta Correcta";
     this.resultadoCorrecto = "";
   }

   respuestaInvalida(){
     this.agilidad.obtenerPuntaje(false);
     this.rojo();
     this.mensaje = "Respuesta Incorrecta";
     this.resultadoCorrecto = this.resolucionMatematica();
   }

  resolucionMatematica(){
    return this.agilidad.cuenta += " " + "=" + " " + this.agilidad.resultado;
  }





}
