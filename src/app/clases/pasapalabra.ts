import {Juego} from './juego';

export class Pasapalabra extends Juego{

   numeroId: number;
   gano : boolean = false;
   jugador : string = "";
   letra: string;
   condicion : string ;
   definicion : string ;
   palabra : string ;
   respuesta : boolean ;
   listaLetras: Array<string> = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];



  constructor(numeroId? : number, letra?: string, condicion? : string , definicion?: string, palabra?: string, correct?: boolean) {
    super("Pasapalabra", false , "");
    this.numeroId = numeroId;
    this.letra = letra;
    this.condicion = condicion;
    this.definicion = definicion;
    this.palabra = palabra;
    this.respuesta = correct;
  }






  verificacionResultado(): boolean {
    return false;
  }


}
