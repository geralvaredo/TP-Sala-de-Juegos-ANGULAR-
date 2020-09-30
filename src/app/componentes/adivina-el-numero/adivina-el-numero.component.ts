
import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import {PersistenceService} from "../../servicios/persistence.service";

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {

 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
  adivina: JuegoAdivina;
  Mensajes:string;
  contador:number;
  puntaje: number;
  ocultarVerificar:boolean;
  jugar : boolean;
  nombreJugador: string ;


  constructor(private db: PersistenceService){

    this.adivina = new JuegoAdivina();
    this.ocultarVerificar=true;
    this.jugar = false;
    this.contador = 0;
    this.puntaje = 0;
  }


  ngOnInit() {
  }



  generarnumero() {
    if(this.adivina.numeroIngresado !== undefined){
      this.adivina.numeroIngresado = null ;
    }
    this.adivina.generarnumero();
    this.contador=0;
    this.jugar = true;
    this.ocultarVerificar = false;
  }
  verificar()  {
    this.jugar = false;
    this.contador++;
    this.ocultarVerificar=true;
    if (this.adivina.verificacionResultado()){
      if(this.contador == 1){
          this.puntaje = 10;
      }
      console.log(this.adivina);
      this.datosDeLaPartida( this.contador,this.puntaje,true);
      this.mostrarMensaje("Sos un Genio!!!",true);
      this.adivina.numeroSecreto=0;
    }else{
      let mensaje:string;
      switch (this.contador) {
          case 1:  mensaje="No, intento fallido, animo";  break;
          case 2:  mensaje="No,Te estaras Acercando???";  break;
          case 3:  mensaje="No es, Yo crei que la tercera era la vencida.";  break;
          case 4:  mensaje="No era el  "+this.adivina.numeroIngresado;   break;
          case 5:  mensaje=" intentos y nada."; break;
          case 6:  mensaje="Afortunado en el amor"; break;
        default:   mensaje="Ya le erraste "+ this.contador+" veces"; break;
      }
      this.puntaje = 1;
      this.datosDeLaPartida(this.contador,this.puntaje,false);
      this.mostrarMensaje(this.contador+" "+mensaje+" ayuda :"+this.adivina.retornarAyuda());

    }

    console.info("numero Secreto:",this.adivina.gano);
  }


  datosDeLaPartida( intentos: number , puntaje: number , partida: boolean ){
    this.adivina.obtenerJugador();
    this.adivina.gano = partida;
    this.adivina.puntaje = puntaje;
    this.adivina.intentos = intentos;
    this.db.crearJuego(this.adivina);
    this.enviarJuego.emit(this.adivina);
  }



  mostrarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;
    let x = document.getElementById("snackbar");
    (ganador) ?  x.className = "show Ganador" :  x.className = "show Perdedor";
    setTimeout(function(){
      x.className = x.className.replace("show", "");
     }, 3000);

   }


}
