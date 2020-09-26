import { Component, OnInit } from '@angular/core';
import {JuegoTateti} from '../../clases/juego-tateti';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  jugar: boolean;
  tablero: boolean;
  botones: boolean;
  message: string = "" ;
  tateti: JuegoTateti ;
  eleccion: number ;
  cuentaMarcas: number = 0;
  dibujo1: string = "";
  dibujo2: string = "";
  dibujo3: string = "";
  dibujo4: string = "";
  dibujo5: string = "";
  dibujo6: string = "";
  dibujo7: string = "";
  dibujo8: string = "";
  dibujo9: string = "";


  constructor() {
    this.jugar = false;
    this.botones = false;
    this.tablero = true;
    this.tateti = new JuegoTateti();
  }

  ngOnInit() {
  }



  resetear(){
    this.tateti.gano = null;
    let vaciar = "";
    this.tateti.tablero = ["" , "" , "" , "" , "" , "" , "" , "" , ""];
    for (let i = 0; i < 9; i++) {
       this.dibujoTablero(i,vaciar);
    }
  }


  comienzo(){
    this.tateti = new JuegoTateti();
    this.jugar = true;
    this.tablero = false;
    this.botones = false;
    this.tateti.ganadorPartida = "";
    this.message = "";
    this.cuentaMarcas = 0;
    this.resetear();
  }

  finalizar(){
    this.jugar =  false;
    this.cuentaMarcas = 9;
  }

  mostrarMensaje(mensaje:string ,condicion: number) {
    this.message = mensaje;
    var x = document.getElementById("snackbar");
      switch(condicion){
        case 1 : x.className = "neon-rojo"; break;
        case 2 : x.className = "neon-verde"; break;
        case 3 : x.className = "neon-amarillo"; break;
        default: break;
      }

    setTimeout(function(){
      x.className = x.className.replace("show", "");
    }, 500);

  }

  opcion(event: Event){
     this.eleccion = parseInt(event.srcElement.id);
     this.generarJugada(this.eleccion);
     this.generarJugadaRival();
     if(this.cuentaMarcas === 9){
       this.chequearMensaje();
     }

  }

   chequearMensaje(){
     if(this.cuentaMarcas < 9 && this.tateti.ganadorPartida !== "" || this.cuentaMarcas === 9 && this.tateti.ganadorPartida === ""){
       switch (this.tateti.ganadorPartida){
         case 'maquina': this.mostrarMensaje("PERDISTE!!",1); break;
         case 'jugador': this.mostrarMensaje("GANASTE!!",2); break;
         case ''       : this.mostrarMensaje("EMPATE!!", 3); break;
         default: break;
       }
     }
   }

  generarJugada(eleccion: number){
     let x = "X";
     if(this.cuentaMarcas < 9){
       if (this.tateti.tablero[eleccion] == ""){
         this.tateti.tablero[eleccion] = x;
         this.dibujoTablero(eleccion,x);
         this.cuentaMarcas++;
         if(this.tateti.verificarVictoria(x)){
           this.deshabilitarBotones();
           this.tateti.ganadorPartida = "jugador";
           this.chequearMensaje();
           this.finalizar();

         }
         // console.log(this.tateti.verificarVictoria(x));
       }
     }

    console.log(this.tateti.tablero);

  }

   generarJugadaRival(){
    let opcionRival = this.tateti.opcionRival();
    this.opcionesDelRival(opcionRival);
   }

  opcionesDelRival(opcionRival: any){
    let O = "O";
    if(this.cuentaMarcas < 9){
      if (this.tateti.tablero[opcionRival] == "" ){
        this.tateti.tablero[opcionRival] = O;
        this.dibujoTablero(opcionRival,O);
        this.cuentaMarcas++;
        if(this.tateti.verificarVictoria(O)){
          this.deshabilitarBotones();
          this.tateti.ganadorPartida = "maquina";
          this.chequearMensaje();
          this.finalizar();

        }
      }else{
           if(this.tateti.tablero[opcionRival] != ""){
             this.generarJugadaRival();
           }
    }

    }



  }

  dibujoTablero(eleccion: number, mensajito: string){
    this.colorLetraCasillero(eleccion,mensajito);
    this.dibujoCasillero(eleccion,mensajito);
  }


  dibujoCasillero(eleccion: number, mensajito: string){
    switch (eleccion){
      case 0: this.dibujo1 = mensajito; break;
      case 1: this.dibujo2 = mensajito; break;
      case 2: this.dibujo3 = mensajito; break;
      case 3: this.dibujo4 = mensajito; break;
      case 4: this.dibujo5 = mensajito; break;
      case 5: this.dibujo6 = mensajito; break;
      case 6: this.dibujo7 = mensajito; break;
      case 7: this.dibujo8 = mensajito; break;
      case 8: this.dibujo9 = mensajito; break;
    }
  }

  colorLetraCasillero(eleccion: number , mensajito: string){
    let btnTateti = document.getElementById(eleccion.toString());
    switch (mensajito){
      case 'X': btnTateti.classList.add('neon-rojo'); break;
      case 'O': btnTateti.classList.add('neon-azul'); break;
      case '' : btnTateti.className = btnTateti.className.replace("botones neon-rojo"  ,"botones");
       btnTateti.className = btnTateti.className.replace("botones neon-azul"  ,"botones");
       break;
    }
  }


  deshabilitarBotones(){
     this.botones = true;
  }

  /*

  marcarJugada(row: number, column: number, jugadaGenerada: boolean) {
    if (jugadaGenerada)
    {
      if (this.juego.tablero[row][column] != "" && this.cuentaMarcas < 9)
      {
        this.GenerarJugada()
      }
      else
      {
        this.cuentaMarcas++;
        this.juego.tablero[row][column] = this.imgX;
        this.turnoJugador = true;
        if(this.juego.verificarVictoria(this.imgX))
        {
          if(!this.juego.verificar())
          {
            //this.MostarMensaje("Perdiste, la maquina juega bien", false);
            let segundos = 2;
            let intervalo = setInterval(()=>
            {
              segundos = segundos -1;
              if(segundos == 0)
              {
                this.juego.resetar();
                clearInterval(intervalo);
              }
            },1000);
          }
        }
      }
    }
    else
    {
      if (this.juego.tablero[row][column] == "")
      {
        this.cuentaMarcas++;
        //this.juego.tablero[row][column] = this.imgO;
        this.turnoJugador = false;
        if (!this.juego.verificarVictoria(this.imgO))
        {
          setTimeout(() => {
            this.GenerarJugada();
          }, 400);
        }
        else
        {
          //this.MostarMensaje("Ganaste, superaste a la maquina", true);

          let segundos2 = 2;
          let intervalo2 = setInterval(()=>
          {
            segundos2 = segundos2 -1;
            if(segundos2 == 0)
            {
              this.juego.resetar();
              clearInterval(intervalo2);
            }
          },1000);
        }
      }
    }
  }*/


/*
  GenerarJugada()
  {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    this.marcarJugada(row, col, true);
  }*/




}
