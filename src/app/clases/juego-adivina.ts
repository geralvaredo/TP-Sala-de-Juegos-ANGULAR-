import { Juego } from './juego';

export class JuegoAdivina extends  Juego {
    numeroSecreto: number;
    numeroIngresado : number;

    constructor(nombre?: string, gano?: boolean, jugador?:string,intentos?:number,puntaje?:number) {
        super("Adivina el número",gano,jugador,intentos,puntaje);
      }

    public verificacionResultado() {
      return (this.numeroIngresado == this.numeroSecreto);
    }

     public generarnumero() {
        this.numeroSecreto = Math.floor((Math.random() * 100) + 1);
        console.info('numero Secreto:' + this.numeroSecreto);
        this.gano = false;
      }
      public retornarAyuda() {
        return (this.numeroIngresado < this.numeroSecreto) ? "Falta" : "Te pasaste";
      }
}
