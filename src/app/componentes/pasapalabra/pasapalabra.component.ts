import {Component, OnInit} from '@angular/core';
import {Pasapalabra} from '../../clases/pasapalabra';

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


  words: Array<Pasapalabra>  = [
    new Pasapalabra(0, "A", "Empieza por A:", " Relato breve de un acontecimiento extraño, curioso o divertido, generalmente ocurrido a la persona que lo cuenta.", "a", null),
    new Pasapalabra(1, "B", "Empieza por B:", " Pasta dulce y esponjosa, hecha con harina, huevos, levadura y otros ingredientes, que puede tener distintas formas", "b", null ),
    new Pasapalabra(2, "C", "Empieza por C:", " Corriente de agua que cae desde cierta altura a causa de un brusco desnivel en su cauce, especialmente en un rio", "c" , null),
    new Pasapalabra(3, "D", "Empieza por D:", " Arma blanca de hoja corta, ancha y puntiaguda, parecida a la espada pero de menor tamaño", "d" , null ),
    new Pasapalabra(4, "E", "Empieza por E:", " Línea curva que describe varias vueltas alrededor de un punto, alejándose cada vez más de él", "e" , null),
    new Pasapalabra(5, "F", "Contiene la F:", " Que está descompuesto o podrido por la acción de diversos factores y determinados microorganismos", "f" , null),
    new Pasapalabra(6, "G", "Empieza por G:", " Que se comporta de manera ruda, tosca o grosera", "g" ,null),
    new Pasapalabra(7, "H", "Contiene la H:", " Persona o animal que es grueso y de poca altura", "h", null),
    new Pasapalabra(8, "I", "Empieza por I:", " Que está en el espacio existente entre dos astros, o que tiene relación con él", "i" , null ),
    new Pasapalabra(9, "J", "Empieza por J:", " Chile picante de unos 5 cm de largo, carnoso y de punta redonda, que se usa para condimentar ciertos guisos", "j" ,null),
    new Pasapalabra(10, "K", "Empieza por K:", " Chile picante de unos 5 cm de largo, carnoso y de punta redonda, que se usa para condimentar ciertos guisos", "k" ,null),
    new Pasapalabra(11, "L", "Contiene la L:", " Hombre pequeño y débil", "l" , null),
    new Pasapalabra(12, "M", "Empieza por M:", " Persona que sufre o muere por defender su religión o sus ideales. ", "m", null),
    new Pasapalabra(13, "N", "Empieza por N:", " Tubo fluorescente que produce una luz brillante.", "n" , null),
    new Pasapalabra(14, "O", "Empieza por O:", " Que conoce todas las cosas reales y posibles.", "o" ,null),
    new Pasapalabra(15, "P", "Contiene la P:", " Calzado de lona, con suela de esparto, cáñamo o goma, que se sujeta al pie por presión o con unas cintas que se atan al tobillo.", "p" ,null),
    new Pasapalabra(16, "Q", "Empieza por Q:", " Que se puede romper fácilmente.", "q" ,null),
    new Pasapalabra(17, "R", "Empieza por R:", " Operación quirúrgica para restaurar la nariz.", "r" , null),
    new Pasapalabra(18, "S", "Contiene la S:", " Falta de cuidado en la forma de vestir y en el aseo personal.", "s" , null),
    new Pasapalabra(19, "T", "Empieza por T:", " Persona alocada, bulliciosa y molesta.", "t", null),
    new Pasapalabra(20, "U", "Contiene la U:", " Persona que rehúye el trato de otras personas y rechaza las atenciones y muestras de cariño.", "u" , null),
    new Pasapalabra(21, "V", "Empieza por V:", " Tributo que el vasallo pagaba a su señor o servicio que le prestaba según este vínculo.", "v" , null),
    new Pasapalabra(22, "X", "Contiene la X:", " Punto culminante o de mayor satisfacción de la excitación sexual en las zonas erógenas o sexuales.", "x" , null),
    new Pasapalabra(23, "Y", "Contiene la Y:", " Toro castrado, que se utiliza como animal de tiro y del cual se aprovecha su carne.", "y", null),
     new Pasapalabra(24, "Z", "Contiene la Z:", " Que es tonto o tiene poca rapidez mental.", "z" , null)
  ];




  constructor() {
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
      return "Has conseguido un total de " + counter + " aciertos.";
  }




}
