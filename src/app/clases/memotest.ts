import {Juego} from './juego';

export class Memotest extends Juego{

  tablero: Array<string> = ["0","0","1","1","2","2","3","3","4","4","5","5"];

  constructor(nombre?: string, gano?: boolean, jugador?: string,
              intentos? :any, resultado?: number){
    super("Memotest",gano,jugador,intentos,resultado);
  }

  ordenarAleatoriamente(){
    this.tablero.sort( function (a, b) { return 0.5 - Math.random()});
  }

  verificacionResultado(): boolean {
    return false;
  }


}
