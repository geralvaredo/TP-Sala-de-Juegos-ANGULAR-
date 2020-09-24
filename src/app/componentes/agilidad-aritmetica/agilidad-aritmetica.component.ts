import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
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

  responder(){
   this.verificarValores();
   clearInterval(this.repetidor);
   this.Tiempo=15;
   this.verificacionDeResultado();
   if(this.nroRonda == 6){
     this.nuevoJuego.obtenerPartida();
     this.inicializaRonda();
     this.condicion();
     console.log(this.nuevoJuego.puntaje);
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

     //this.renderer.setStyle(this.divMensaje,"backgroundColor",'green');
     this.mensaje = "GANASTE!!" ;
   }

   divRojo(){
     //this.renderer.setStyle(this.divMensaje,"backgroundColor",'red');
     this.mensaje = "PERDISTE!!";
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
     this.mensaje = "Respuesta Correcta";
     this.resultadoCorrecto = "";
   }

   respuestaInvalida(){
     this.nuevoJuego.obtenerPuntaje(false);
     this.mensaje = "Respuesta Incorrecta";
     this.resultadoCorrecto = this.resolucionMatematica();
   }

  resolucionMatematica(){
    return this.nuevoJuego.cuenta += " " + "=" + " " + this.nuevoJuego.resultado;
  }

   inicializaRonda(){
    this.nroRonda = 1;
   }

/*



  constructor() {
    this.ocultarVerificar=true;

    this.Tiempo=8;
    this.arrayResultados = JSON.parse(this.jugador);
    this.intentos = 0;
    this.nuevoJuego = new JuegoAgilidad ("Agilidad Aritmetica", false, this.jugador, 0, "00");

    console.info("Inicio agilidad");
  }

  NuevoJuego() {
    console.log("nuevo");
    this.ocultarVerificar=false;
    this.nuevoJuego.generar();
    console.log(this.nuevoJuego);
    this.nuevoJuego.respuesta = null;
    this.repetidor = setInterval(()=>{

      this.Tiempo--;

      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=8;

      }
    },900);
  }


  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
    if(this.nuevoJuego.verificar())
    {
      this.MostarMensaje("Correcto. Acertaste el resultado!!",true);
      this.nuevoJuego.gano = true;
      this.nuevoJuego.nombre="Agilidad Aritmetica";
      this.nuevoJuego.jugador=sessionStorage.getItem('user');

    }
    else
    {
      this.nuevoJuego.gano = false;
      this.nuevoJuego.nombre="Agilidad Aritmetica";
      this.nuevoJuego.jugador=sessionStorage.getItem('user');
      this.MostarMensaje("Fallaste. El calculo es incorrecto!!",false);
    }
    //this.nuevoJuego.guardarLocal();

    //Despues de verificar si gane o no, reinicio el juego!!

    this.Tiempo=5;
    this.ocultarVerificar=true;



  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;
    var x = document.getElementById("snackbar");
    if(ganador)
    {
      x.className = "show Ganador";
    }else{
      x.className = "show Perdedor";
    }
    var modelo=this;
    setTimeout(function(){
      x.className = x.className.replace("show", "");

    }, 3000);
    console.info("objeto",x);

  }
*/



}
