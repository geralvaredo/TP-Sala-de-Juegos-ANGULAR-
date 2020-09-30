import {Juego} from './juego';

export class JuegoTateti extends Juego{

   rival: number;
   ganadorPartida: string ;
   partida : boolean;
  tablero: Array<string> = ["" , "" , "" , "" , "" , "" , "" , "" , ""];

  constructor(nombre?: string, gano?: boolean, jugador?: string,
              intentos? :any, resultado?: number){
    super("TA TE TI",gano,jugador,intentos,resultado);
  }


  verificacionResultado(): boolean {
    return false;
  }

  opcionRival(){
    return this.rival = Math.floor( Math.random() * 8 ) ;
  }



  verificarVictoria(simbolo: string): boolean  {
    if (//horizontales
      (this.tablero[0] == simbolo && this.tablero[1] == simbolo && this.tablero[2] == simbolo) ||
      (this.tablero[3] == simbolo && this.tablero[4] == simbolo && this.tablero[5] == simbolo) ||
      (this.tablero[6] == simbolo && this.tablero[7] == simbolo && this.tablero[8] == simbolo) ||
      //verticales
      (this.tablero[0] == simbolo && this.tablero[3] == simbolo && this.tablero[6] == simbolo) ||
      (this.tablero[1] == simbolo && this.tablero[4] == simbolo && this.tablero[7] == simbolo) ||
      (this.tablero[2] == simbolo && this.tablero[5] == simbolo && this.tablero[8] == simbolo) ||
      //diagonales
      (this.tablero[0] == simbolo && this.tablero[4] == simbolo && this.tablero[8] == simbolo) ||
      (this.tablero[2] == simbolo && this.tablero[4] == simbolo && this.tablero[6] == simbolo)){

       this.partida = true;
    }

    return this.partida;
  }


}
