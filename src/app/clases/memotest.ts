import {Juego} from './juego';

export class Memotest extends Juego{

  tablero: Array<string> = ["0","0","1","1","2","2","3","3","4","4","5","5"];


  ordenarAleatoriamente(){
    this.tablero.sort( function (a, b) { return 0.5 - Math.random()});
  }

  verificacionResultado(): boolean {
    return false;
  }


}
