export class Jugador {
  nombre : string ;
  apodo : string ;
  avatar : string ;
  sexo  : string ;
  terminos : boolean;

  constructor(nombre?: string, apodo?: string , avatar?: string , sexo?: string) {
    this.nombre = nombre;
    this.apodo = apodo;
    this.avatar = avatar;
    this.sexo = sexo;
  }


}
