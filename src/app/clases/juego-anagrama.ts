import {Juego} from './juego';

export class JuegoAnagrama extends Juego{

  public respuesta:string;
  public anagrama:string = '';
  public intentos: number = 0;
  public counter: number = 0 ;
  private wordList:string[] = ["silbar", "acuerdo",
    "integrarla", "noguera", "prisa", "pagar"];

  constructor(gano?: boolean, jugador?: string) {
    super("Anagrama", gano, jugador);

  }

  verificacionResultado(): boolean {
    return null;
  }

  public checkrespuesta(): boolean{
    switch (this.anagrama) {
      case 'silbar':
        if(this.respuesta === 'brasil') {
          return true;
        }
        break;
      case 'acuerdo':
        if(this.respuesta === 'ecuador') {
          return true;
        }
        break;
      case 'integrarla':
        if(this.respuesta === 'inglaterra') {
          return true;
        }
        break;
      case 'noguera':
        if(this.respuesta === 'noruega') {
          return true;
        }
        break;
      case 'tangerina':
        if (this.respuesta === 'argentina') {
          return true;
        }
        break;
      case 'prisa':
        if(this.respuesta === 'paris') {
          return true;
        }
        break;
      default:
        return false;
    }
  }



  public obtenerAnagrama() {
    this.anagrama = this.wordList[Math.floor(Math.random() * 6)];
  }

  public verificar(): boolean {
   return this.checkrespuesta() ;
  }

  condicion(){
      this.intentos = this.intentos + 1;
  }


}
