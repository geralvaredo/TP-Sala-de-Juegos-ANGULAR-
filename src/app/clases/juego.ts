export abstract class Juego {
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano = false;
  public intentos : number;
  public puntaje : number;
  fecha: any;
  resultado: any;

  constructor(nombre?: string, gano?: boolean,jugador?:string,
              intentos?:any,puntaje?:number) {

      this.nombre = nombre;
      this.gano   = gano;
     this.jugador = jugador;
     this.intentos = intentos;
     this.puntaje = puntaje;
  }

  obtenerJugador(){
    return this.jugador = sessionStorage.getItem('usuario');
  }


  public abstract verificacionResultado(): boolean;

  public retornarAyuda() {

    return "NO hay Ayuda definida";
  }
}
