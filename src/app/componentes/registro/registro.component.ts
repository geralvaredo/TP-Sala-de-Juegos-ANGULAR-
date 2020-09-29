import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Usuario} from "../../clases/usuario";
import {AuthService} from "../../servicios/auth.service";
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
  ErrorOnRegister = "ErrorOnRegister";

  constructor(private auth: AuthService ) { }

  ngOnInit() {
  }

  cancelar(){
    this.auth.redirect('Principal');
  }


  async onRegister(): Promise<void> {
    try {
      const user = await this.auth.register(this.usuario);
      if (user) {
        // this.mensajeDireccion(this.usuario);
        this.usuario._email = "";
        this.usuario._pass = "";
        this.auth.redirect(this.isRegistered);
      } else {
        this.auth.redirect(this.registerError);
      }
    } catch (error) {
      console.log(this.ErrorOnRegister, error);
    }
  }



     mensajeDireccion(usuario: Usuario){
    setTimeout(function(){
      alert("Bievenido" + usuario._email);
    }, 2000);

  }


}
