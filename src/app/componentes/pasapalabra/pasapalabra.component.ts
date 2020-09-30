import {Component, OnInit} from '@angular/core';
import {Pasapalabra} from '../../clases/pasapalabra';
import {PersistenceService} from "../../servicios/persistence.service";

@Component({
  selector: 'app-pasapalabra',
  templateUrl: './pasapalabra.component.html',
  styleUrls: ['./pasapalabra.component.css']
})
export class PasapalabraComponent implements OnInit {



  descripcion : boolean;
  cuestionario: boolean;
  iconCerrar: boolean;
  pasapalabra: Pasapalabra;
  contador : number;
  condicion : string = "";
  definicion: string = "" ;
  tiempo : number ;
  puntaje: number = 25;
  repetidor: any ;
  finPartida: boolean;
  tituloFinal : string;
  subtituloFinal : string;
  resultadoPartida: boolean;
  resultadoFinal : string;


  words: Array<Pasapalabra>  = [
    new Pasapalabra(0, "A", "Empieza por A:", " Pais originario del asado.", "argentina", null),
    new Pasapalabra(1, "B", "Empieza por B:", " Masa blanda y compacta de tierra y agua", "barro", null ),
    new Pasapalabra(2, "C", "Empieza por C:", " país en el cual nació el narcotraficante Pablo Escobar", "colombia" , null),
    new Pasapalabra(3, "D", "Empieza por D:", " objeto de forma cubica que permite obtener un numero al azar", "dado" , null ),
    new Pasapalabra(4, "E", "Empieza por E:", " construccion constituida por una sucesion de escalones", "escalera" , null),
    new Pasapalabra(5, "F", "Empieza por F:", " apellido de conductor de F1 de la argentina de la decada del 50", "fangio" , null),
    new Pasapalabra(6, "G", "Empieza por G:", " nombre masculino de mamifero felino", "gato" ,null),
    new Pasapalabra(7, "H", "Empieza por H:", " Cigarro puro elaborado en la isla de Cuba", "habano", null),
    new Pasapalabra(8, "I", "Empieza por I:", " Oriundo de Inglaterra", "ingles" , null ),
    new Pasapalabra(9, "J", "Empieza por J:", " Sustancia sólida o líquida que, mezclada con agua, sirve para lavarse o lavar la ropa", "jabon" ,null),
    new Pasapalabra(10, "K", "Empieza por K:"," Prenda de vestir en forma de T , típica de Japón.", "kimono" ,null),
    new Pasapalabra(11, "L", "Empieza por L:", " Barrita de grafito envuelta en madera que es utilizado para escribir o dibujar.", "lapiz" , null),
    new Pasapalabra(12, "M", "Empieza por M:", " Pais vecino de España cruzando el estrecho de Gibraltar", "marruecos", null),
    new Pasapalabra(13, "N", "Empieza por N:", " Parte saliente de la cara, ubicada entre la frente y boca.", "nariz" , null),
    new Pasapalabra(14, "O", "Empieza por O:", " Conjunto de instrumentistas que interpretan obras musicales.", "orquesta" ,null),
    new Pasapalabra(15, "P", "Empieza por P:", " Capacidad de aguantar situaciones desagradables, dolorosas, ofensivas o pesadas sin quejarse...", "paciencia" ,null),
    new Pasapalabra(16, "Q", "Empieza por Q:", " Sala donde se realizan operaciones", "quirofano" ,null),
    new Pasapalabra(17, "R", "Empieza por R:", " Huella que deja algo o alguien.", "rastro" , null),
    new Pasapalabra(18, "S", "Empieza por S:", " Pez fluvial y marino de carne rosa pálido muy estimada.", "salmon" , null),
    new Pasapalabra(19, "T", "Empieza por T:", " Mamífero carnívoro félido asiático, muy feroz y de gran tamaño.", "tigre", null),
    new Pasapalabra(20, "U", "Empieza por U:", " Animal fabuloso de cuerpo de caballo y cuerno en la frente.", "unicornio" , null),
    new Pasapalabra(21, "V", "Empieza por V:", " Conjunto de tazas, vasos, platos, etc., para el servicio de la mesa.", "vajilla" , null),
    new Pasapalabra(22, "X", "Empieza por X:", " Odio o desprecio hacia los extranjeros.", "xenofobia" , null),
    new Pasapalabra(23, "Y", "Empieza por Y:", " Lugar en el que hay gran cantidad de un mineral, una roca o restos de antiguas culturas.", "yacimiento", null),
     new Pasapalabra(24, "Z", "Empieza por Z:", " Fruto de la zarza, de color morado cuando esta maduro y sabor dulce.", "zarzamora" , null)
  ];




  constructor(private db : PersistenceService) {
    this.pasapalabra = new Pasapalabra();
    this.tiempo = 150;
    this.puntaje = 25;
    this.contador = 0;
    this.descripcion = false;
    this.cuestionario = true;
    this.iconCerrar = true ;
    this.finPartida = true ;
    this.condicion = "";
    this.definicion = "";
    this.resultadoPartida = null;

  }

  ngOnInit() {

  }


  barraEspaciadora(){
    this.pasarDePalabra();
    this.continuarJugando();
  }

  enter(){
    this.chequearRespuesta(this.contador);
    this.continuarJugando();
  }

  jugar(){
    this.db.crearPasapalabra(this.words);
    this.descripcion = true ;
    this.cuestionario = false;
    this.iconCerrar = false ;
    this.tiempo = 150;
    this.limpiarRepetidor();
    this.mostrarDenificion(this.contador);
  }

  mostrarDenificion(contador: number){
    this.condicion = this.words[contador].condicion;
    this.definicion = this.words[contador].definicion;
  }

  limpiarRepetidor(){
    this.repetidor = setInterval(()=>{
      this.tiempo--;
      if(this.tiempo== 0 ) {
        this.finalizarJuego();
        clearInterval(this.repetidor);
         this.tiempo= 150;
      }
    }, 1000);
  }


   continuarJugando() {
    if (this.contador != 25) {
      this.pasapalabra.palabra = "";
      this.mostrarDenificion(this.contador);
    } else {
      this.finalizarJuego();
    }
  }

    finalizarJuego(){
      clearInterval(this.repetidor);
      this.cuestionario = true ;
      this.finPartida = false;
      this.tituloFinal = "Fin de Partida";
      this.subtituloFinal = this.mostrarPuntaje();
      this.iconCerrar = true;
  }

  deNuevo(){
    location.reload();
  }

  enviar(){
    this.chequearRespuesta(this.contador);
    this.continuarJugando();
  }
  cerrar(){
    this.finalizarJuego();
  }

  evaluarPartida(intentos : number){
    return (intentos < 12) ? this.pasapalabra.gano = false : this.pasapalabra.gano = true;
  }


   chequearRespuesta(contador: number) {
    var respuestaUsuario = this.pasapalabra.palabra.toLowerCase();
    if(respuestaUsuario == this.words[contador].palabra){
       this.words[contador].respuesta = true;
      this.estiloDeCirculos(contador,'item item--success');
    }else{
         this.words[contador].respuesta = false;
      this.estiloDeCirculos(contador,'item item--failure');
    }
     this.puntaje--;
    return this.contador++;
  }

   estiloDeCirculos(contador: number , tipoClase: string){
     for (let i = 0; i < this.pasapalabra.listaLetras.length; i++) {
       if (this.pasapalabra.listaLetras[i] == this.words[contador].letra){
         var item = document.getElementById(this.pasapalabra.listaLetras[i]);
         item.className = item.className.replace("item item--warning", "item");
         item.className = item.className.replace("item", tipoClase);
       }
     }
   }

   pasarDePalabra(){
     this.estiloDeCirculos(this.contador,"item item--warning");
     this.pasar(this.contador);
     this.continuarJugando();
   }

   pasar(contador: number) {
    var w = this.words.splice(contador, 1)[0];
     this.words.push(w);
  }

  mostrarPuntaje(){
    var counter = 0;
    for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].respuesta == true) {
          counter++;
        }
      }
       this.datosDeLaPartida(counter);
      return "Has conseguido un total de " + counter + " aciertos.";
  }



  datosDeLaPartida(intentos: number){
    this.pasapalabra.obtenerJugador();
    console.log(this.pasapalabra);
    (this.evaluarPartida(intentos)) ? this.resultadoFinal = "GANASTE!!" : this.resultadoFinal = "PERDISTE!!";
    this.pasapalabra.intentos = intentos;
    this.pasapalabra.puntaje = intentos;

    this.db.crearJuego(this.pasapalabra);
  }



}
