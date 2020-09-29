import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  ocultarNumeros: boolean;
  btnArranque: boolean;
  Tiempo: number;
  repetidor:any;
  nroRonda : number;
  mensaje: string;
  mostrarMensaje: boolean;
  resultadoCorrecto: string;
  private subscription: Subscription;

  ngOnInit() {
  }

   enviarJugada(juego: JuegoAgilidad){
    this.enviarJuego.emit(juego);
   }

   constructor() {
     this.ocultarVerificar=true;
     this.inicializaRonda();
     this.Tiempo=15;
     this.ocultarNumeros = true;
     this.btnArranque = false;
    this.nuevoJuego = new JuegoAgilidad();
     this.mostrarMensaje = false;
     console.info("Inicio agilidad");
  }

  inicializaRonda(){
    this.nroRonda = 1;
  }

  NuevoJuego() {
       if(this.nroRonda == 1){
         this.nuevoJuego.puntajeInicial();
       }
      this.ocultarVerificar=false;
      this.btnArranque = true;
      this.mostrarMensaje = false;
      this.nuevoJuego.operacionAleatoria();
      this.nuevoJuego.resultadoUsuario = null;
      this.limpiarRepetidor();
  }



  responder(){
   this.verificarValores();
   clearInterval(this.repetidor);
   this.Tiempo=15;
   this.verificacionDeResultado();
   if(this.nroRonda == 6){
     this.nuevoJuego.obtenerPartida();
     this.inicializaRonda();
     this.condicion();
     }
   }

   condicion(){
      this.mensaje = "";
    if (this.nuevoJuego.partida){
      this.divVerde();
    }else{
      this.divRojo();
    }
      this.mostrarMensaje = true;
   }

   divVerde(){
     this.verde();
     this.nuevoJuego.gano = true;
     this.mensaje = "GANASTE!!" ;
   }

   divRojo(){
     this.rojo();
     this.nuevoJuego.gano = false;
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
  }

  verificacionDeResultado(){
    if(this.nuevoJuego.verificacionResultado()){
      this.respuestaAcertada();
    } else{
      this.respuestaInvalida();
    }
    this.mostrarMensaje = true;
    this.nroRonda++;
  }

   respuestaAcertada(){
     this.nuevoJuego.obtenerPuntaje(true);
     this.verde();
     this.mensaje = "Respuesta Correcta";
     this.resultadoCorrecto = "";
   }

   respuestaInvalida(){
     this.nuevoJuego.obtenerPuntaje(false);
     this.rojo();
     this.mensaje = "Respuesta Incorrecta";
     this.resultadoCorrecto = this.resolucionMatematica();
   }

  resolucionMatematica(){
    return this.nuevoJuego.cuenta += " " + "=" + " " + this.nuevoJuego.resultado;
  }





}
