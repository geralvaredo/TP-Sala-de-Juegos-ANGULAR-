import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {AuthService} from "../../servicios/auth.service";
import {Usuario} from "../../clases/usuario";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario = new Usuario();
  isLogin = 'Principal';
  notLogin = 'Error';
  errorLogin = 'ErrorOnlogin->';
  clave= '';
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;
  isFirstOpen = true;


  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
  }

  cancelar(){
    this.auth.redirect('Principal');
  }

  registro(){
    this.auth.redirect('Registro');
  }

  administrador(){
    this.usuario._email = "admin@admin.com";
    this.usuario._pass = "admin123";
  }

  async onLogin(): Promise<void> {
    try {
      const logging = await this.auth.login(this.usuario);
      if (logging) {
        this.auth.redirect(this.isLogin);
      } else {
        this.auth.redirect(this.notLogin);
      }
    } catch (error) {
      console.log(this.errorLogin, error);
    }
  }


}
