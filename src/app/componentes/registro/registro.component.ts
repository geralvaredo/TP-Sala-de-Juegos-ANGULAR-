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
  usuario : Usuario;
  jugador : Jugador;
  ErrorOnRegister = "ErrorOnRegister";
  bowser =  './assets/imagenes/bowser.jpeg' ;
  mario = './assets/imagenes/marioCarton.jpeg' ;
  peach = './assets/imagenes/peach.png';
  yoshi = './assets/imagenes/yoshiCarton.jpeg';
  toad = './assets/imagenes/toadCarton.jpeg';
  luigi = './assets/imagenes/luigiCarton.png';
  wario = './assets/imagenes/warioCarton.jpeg';
  dk = './assets/imagenes/dk.jpeg' ;

  constructor(private auth: AuthService , private  db: PersistenceService) {
    this.usuario = new Usuario();
    this.jugador = new Jugador();
  }

  ngOnInit() {
  }

  cancelar(){
    this.auth.redirect('Login');
  }


  async onRegister(): Promise<void> {
    try {
          let valor = this.contrasenaConRepeticion();
          if(valor){
            if( this.usuarioVacio() && this.jugadorVacio() && this.terminosVacio()){
                const user = await this.auth.register(this.usuario);
                if (user) {
                   this.registroCorrecto();
                  this.auth.redirect(this.isRegistered);
                } else {
                  this.auth.redirect(this.registerError);
                }
            }
            else{
              this.auth.redirect(this.registerError);
            }
          } else{
            this.auth.redirect(this.registerError);
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
    return (this.apodoVacio() &&  this.avatarVacio() && this.sexoVacio() );
   }

   contrasenaConRepeticion(){
    return (this.usuario._pass.toString() == this.usuario._passRepeat.toString());
   }

   sexoVacio() {
     return (this.jugador.sexo !== null && this.jugador.sexo !== undefined);

   }

   apodoVacio(){
    return ( this.jugador.apodo !== null && this.jugador.apodo !== undefined );
   }

   avatarVacio() {
     return (this.jugador.avatar !== null && this.jugador.avatar !== undefined);
   }

   terminosVacio(){
      return (this.jugador.terminos !== null && this.jugador.terminos !== undefined && this.jugador.terminos !== false);
   }

 registroCorrecto(){
   sessionStorage.setItem("usuario", JSON.stringify(this.usuario._email));
   this.jugador.nombre = this.usuario._email;
   this.db.crearJugadores(this.jugador);
   this.usuario._email = "";
   this.usuario._pass = "";
 }


}
