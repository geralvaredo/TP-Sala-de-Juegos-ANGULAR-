import { Component, OnInit } from '@angular/core';
import {Memotest} from '../../clases/memotest';
import {PersistenceService} from "../../servicios/persistence.service";

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  memotest: Memotest;
  comenzar:boolean = false;
  mensaje:string;
  mostrarMensaje:boolean = false;
  mostrar:boolean[] = new Array(12);
  tarjetaA = null;
  tarjetaB = null;
  indexA:number;
  indexB:number;
  //intentos:number;

  constructor(private db: PersistenceService) {
    this.memotest = new Memotest();
  }

  comenzarJuego() {
    this.memotest = new Memotest();
    this.comenzar = true;
    this.memotest.ordenarAleatoriamente();
    this.memotest.intentos = 11;
    this.ocultar();
  }

  inicializarMostrar(){
    for(let i = 0; i < 12; i++) {
      this.mostrar[i] = true;
    }
  }

  jugar(casillero:number) {
    if(!this.mostrar[casillero]) {
      this.mostrar[casillero] = true;
      setTimeout(() => {
        if(this.tarjetaA == null) {
          this.tarjetaA = this.memotest.tablero[casillero];
          this.indexA = casillero;
        } else {
          this.tarjetaB = this.memotest.tablero[casillero];
          this.indexB = casillero;
          if(this.tarjetaA == this.tarjetaB) {
            this.verficiarGanador();
          } else {
            this.memotest.intentos--;
            if(this.memotest.intentos < 1) {
              this.jugadorPerdio();
            } else {
              this.mostrar[this.indexA] = false;
              this.mostrar[this.indexB] = false;
            }

          }
          this.tarjetaA = null;
          this.tarjetaB = null;
        }
      }, 500);
    }
  }


  datosDeLaPartida(gano: boolean){
    this.memotest.obtenerJugador();
    this.memotest.gano = gano ;
    this.memotest.puntaje = this.memotest.intentos;
    this.db.crearJuego(this.memotest);
  }


  ocultar() {
    for(let i = 0; i < 12; i++) {
      this.mostrar[i] = false;
    }
  }

  verficiarGanador() {
    let contador:number = 0;
    for(let i = 0; i < 12; i++) {
      if(this.mostrar[i]) {
        contador++;
      }
    }
    if(contador == 12) {
      this.jugadorGano();
    }
  }

  jugadorGano() {
    this.mostrarMensaje = true;
    this.mensajeConColor("neon-verde",'GANASTE!!');
    this.datosDeLaPartida(true );
    setTimeout(() => this.reiniciar(), 6000);
  }

  jugadorPerdio() {
    this.mostrarMensaje = true;
    this.mensajeConColor("neon-rojo","PERDISTE!!");
    this.datosDeLaPartida(false);
    setTimeout(() => this.reiniciar(), 6000);
  }

  mensajeConColor(color: string, frase: string){
    this.mensaje = frase ;
    var mensaje = document.getElementById("mensaje");
    mensaje.className = color;
  }

  reiniciar() {
    this.mostrarMensaje = false;
    this.comenzar = false;
    this.inicializarMostrar();
  }


  ngOnInit(): void {
  }


}
