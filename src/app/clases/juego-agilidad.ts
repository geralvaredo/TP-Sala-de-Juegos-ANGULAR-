import {Juego} from './juego';

export class JuegoAgilidad extends Juego {
   numeroUno: number ;
   numeroDos: number ;
   operador: string ;
  resultado: number ;
  resultadoUsuario: number ;
  partida : boolean ;
  puntaje: number ;
  cuenta : string ;
  estiloMensaje : string;


  constructor(nombre?: string, gano?: boolean, jugador?: string,
              intentos? :any, resultado?: string){
         super(nombre,gano,jugador,intentos,resultado);
  }

  operacionAleatoria() {
    this.numerosAleatorios();
    switch (this.operador){
      case '+': this.resultado = this.numeroUno + this.numeroDos; break;
      case '-': this.resultado = this.numeroUno - this.numeroDos; break;
      case '*': this.resultado = this.numeroUno * this.numeroDos; break;
      case '/': this.resultado = this.numeroUno / this.numeroDos; break;
    }
    this.cuenta = this.numeroUno.toString() + " " + this.operador.toString()+ " " + this.numeroDos.toString();
  }

   numerosAleatorios(){
     this.numeroUno =  Math.round( Math.random()  * 100 ) ;
     this.numeroDos =  Math.round( Math.random()  * 100 ) ;
     while (this.numeroDos === 0 ){
       this.numeroDos =  Math.round( Math.random()  * 100 ) ;
     }
     while (this.numeroDos > this.numeroUno){
       this.numeroDos =  Math.round( Math.random()  * 100 ) ;
     }
     this.operador = this.operadorAleatorio();
}


  operadorAleatorio(){
    var ops=['+','-','*','/'];
    var index = Math.round( Math.random() * 3 ) ;
    return ops[index] ;
  }

  public verificacionResultado(): boolean {
    return this.resultado == this.resultadoUsuario;
  }

  public obtenerPuntaje(jugada : boolean){
    if(jugada){
      this.puntaje = this.puntaje + 5;
    }else {
      this.puntaje = this.puntaje + 1;
    }
  }

  public obtenerPartida(){
    (this.puntaje <= 13) ? this.partida = false : this.partida = true;
  }

  public puntajeInicial(){
    this.puntaje = 0 ;
  }

}
