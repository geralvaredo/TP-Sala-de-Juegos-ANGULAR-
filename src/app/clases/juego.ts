export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  intentos : number;


  constructor(nombre?: string, gano?: boolean,jugador?:string,
              intentos?:any,resultado?:string) {
    if (nombre)
      this.nombre = nombre;

    if (gano)
      this.gano = gano;
    if(jugador)
      this.jugador=jugador;
    else
      this.jugador= "natalia natalia";
  }




  public abstract verificacionResultado(): boolean;

  public retornarAyuda() {

    return "NO hay Ayuda definida";
  }
}
