import {Juego} from './juego';

export class JuegoPiedraPapelTijera extends Juego{

  eleccion : number ;
  rival : number ;
  partida: string ;
  mensaje : string ;


  constructor(nombre?: string, gano?: boolean, jugador?: string,
              intentos? :any, resultado?: number){
    super("Piedra Papel Tijera",gano,jugador,intentos,resultado);
  }


  verificacionResultado(): boolean {
           this.partidaEmpate();
          if(!this.gano){
            switch (this.eleccion){
              case 0 :
                 this.rival === 2 ?  this.partidaGanada() : this.partidaPerdida() ;
                break;
              case 1:
                this.rival === 0 ? this.partidaGanada()  : this.partidaPerdida() ;
                 break;
              case 2:
                    this.rival === 1 ? this.partidaGanada() : this.partidaPerdida() ;
                    break;
            }

          }

    return this.gano;

  }

   partidaGanada(){
     this.gano = true;
     this.mensaje = "GANASTE!!" ;
   }

   partidaPerdida(){
     this.gano = false;
     this.mensaje = "Perdiste !!";
   }

    partidaEmpate(){
      if(this.eleccion === this.rival){
        this.mensaje = "Empate!!" ;
        this.partida = "E";
        this.gano = true;
      }else {
        this.gano = false;
      }

    }



}
