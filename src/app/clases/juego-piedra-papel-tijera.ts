import {Juego} from './juego';

export class JuegoPiedraPapelTijera extends Juego{

  eleccion : number ;
  rival : number ;
  partida : boolean;
  mensaje : string ;


  verificacionResultado(): boolean {
           this.partidaEmpate();
          if(!this.partida){
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

    return this.partida;

  }

   partidaGanada(){
     this.partida = true;
     this.mensaje = "GANASTE!!" ;

   }

   partidaPerdida(){
     this.partida = false;
     this.mensaje = "Perdiste !!";
   }

    partidaEmpate(){
      if(this.eleccion === this.rival){
        this.mensaje = "Empate!!" ;
        this.partida = true;
      }else {
        this.partida = false;
      }


    }



}
