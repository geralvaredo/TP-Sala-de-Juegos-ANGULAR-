import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import {Jugador} from "../../clases/jugador";
import {PersistenceService} from "../../servicios/persistence.service";
import {Juego} from "../../clases/juego";
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  jugadores: Array<Jugador> = [] ;

    constructor(private db: PersistenceService) {
     this.listarJugadores();
    }

  listarJugadores(){
    this.db.obtenerJugadores("jugadores").subscribe(
      (lista: Array<Jugador>) => {
        for (let i = 0; i < lista.length; i++) {
             this.jugadores.push(new Jugador(lista[i].nombre,lista[i].apodo, this.pasarImagenes(lista[i].avatar) ,lista[i].sexo));
             console.log(this.jugadores);
        }
      }
    )



  }

  pasarImagenes(img : string){
     switch (img){
       case 'b': return './assets/imagenes/bowser.jpeg'; break;
       case 'm': return './assets/imagenes/marioCarton.jpeg'; break;
       case 'p': return './assets/imagenes/peach.png' ; break ;
       case 'y': return './assets/imagenes/yoshiCarton.jpeg' ; break ;
     }
    }


  ngOnInit() {
  }

/*
  TraerTodos(){
    //alert("totos");
    this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerGanadores(){
    this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
  TraerPerdedores(){
    this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
      //console.info("jugadores listado",(data));
      this.listado= data;

    })
  }
*/
}
