import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Usuario} from "../../clases/usuario";
import {AuthService} from "../../servicios/auth.service";
import {PersistenceService} from "../../servicios/persistence.service";
import {Jugador} from "../../clases/jugador";
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  isRegistered = 'Juegos';
  registerError = 'Error';
  usuario = new Usuario();
  jugador = new Jugador();
  ErrorOnRegister = "ErrorOnRegister";
  bowser =  './assets/imagenes/bowser.jpeg' ;
  mario = './assets/imagenes/marioCarton.jpeg' ;
  peach = './assets/imagenes/peach.png';
  yoshi = './assets/imagenes/yoshiCarton.jpeg';


  constructor(private auth: AuthService , private  db: PersistenceService) {

  }

  ngOnInit() {
  }

  cancelar(){
    this.auth.redirect('Principal');
  }


  async onRegister(): Promise<void> {
    try {
         if( this.usuarioVacio() && this.jugadorVacio()){
             if(this.contrasenaConRepeticion){
               const user = await this.auth.register(this.usuario);
               if (user) {
                 sessionStorage.setItem("usuario", JSON.stringify(this.usuario._email));
                 this.jugador.nombre = this.usuario._email;
                 this.db.crearJugadores(this.jugador);
                 this.usuario._email = "";
                 this.usuario._pass = "";
                 this.auth.redirect(this.isRegistered);
               } else {
                 this.auth.redirect(this.registerError);
               }
             }

         }
         else{
           alert( "Debe completar todos los campos inclusive los terminos y condiciones");
         }

    } catch (error) {
      console.log(this.ErrorOnRegister, error);
    }
  }

   validacion(){
   }

   usuarioVacio(){
       return (this.usuario._email !== null && this.usuario._pass !== null) ;
   }

   jugadorVacio(){
    return (this.jugador.apodo !== null && this.jugador.sexo !== null && this.jugador.avatar !== null && this.jugador.terminos !== null) ;
   }

   contrasenaConRepeticion(){
    return (this.usuario._pass == this.usuario._passRepeat);
   }

   cargaJugador(){

   }

}
