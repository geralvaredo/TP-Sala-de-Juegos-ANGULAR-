import {Juego} from './juego';
import {element} from "protractor";

export class JuegoAnagrama extends Juego{

  public respuesta:string;
  public palabra:string = '';
  public intentos: number = 1;
  public counter: number = 0 ;
  public wordList:string[] = [ "silbar", "acuerdo",
    "integrarla", "noguera", "prisa", "pagar"];

  public wordRepeat: string[] = [" ", "", "", "" , "", ""];

  constructor(nombre?: string,  gano?: boolean, jugador?: string, intentos ? : number, resultado? : number) {
    super("Anagrama", gano , jugador, intentos , resultado );

  }

  listaPalabras(lista){

  }


  verificacionResultado(): boolean {
    return null;
  }

  public checkrespuesta(): boolean{
    switch (this.palabra) {
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
    this.palabra = this.wordList[Math.floor(Math.random() * 7)];
    while(this.wordRepeat.find(element => element == this.palabra)){
      this.palabra = this.wordList[Math.floor(Math.random() * 7)];
    }
    this.wordRepeat.push(this.palabra);
    //console.log(palabraRepetida);


  }

  public verificar(): boolean {
   return this.checkrespuesta() ;
  }

  condicion(){
      this.intentos++;
      console.log(this.intentos);
  }


}
