
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import {PersistenceService} from "../../servicios/persistence.service";
import {Juego} from "../../clases/juego";
import {JuegoAgilidad} from "../../clases/juego-agilidad";

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

 listadoGeneral: Array<Juego>;
 listadoGanadores : Array<Juego>;
 listadoPerdedores : Array<Juego>;
 misResultados : Array<Juego>;

  constructor(private db : PersistenceService) {
    this.listarResultados();
   }

  ngOnInit() {

  }

  listarResultados(){
        this.db.obtenerJuego("juegos").subscribe(
          (lista: Array<Juego>) => {
               this.listadoGeneral = lista;
          }
        )}



}
