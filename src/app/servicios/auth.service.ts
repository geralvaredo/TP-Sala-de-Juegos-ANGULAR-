import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Usuario} from "../clases/usuario";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorLogin = 'ErrorLogin ->';
  errorVerificationEmailFireBase = 'ErrorVerificationEmailFireBase->';
  errorRegisterFireBase = 'ErrorRegisterFireBase ->';
  paginaLogin = '';
  logOutError = 'error';


  constructor(private afAuth: AngularFireAuth, private  router: Router) {
  }



  async login(usuario: Usuario): Promise< any> {
    try {
       const {user} = await this.afAuth.auth.signInWithEmailAndPassword(usuario._email, usuario._pass);
        sessionStorage.setItem("usuario", JSON.stringify(usuario._email));
       return user;
    } catch (error) {
      console.log(this.errorLogin, error);
    }
  }




  async register(usuario: Usuario): Promise<any> {
    try {
      const {user} = await this.afAuth.auth.createUserWithEmailAndPassword(usuario._email, usuario._pass);
      await this.verificationEmailFirebase();
      return user;
    } catch (error) {
      console.log(this.errorRegisterFireBase, error);
    }
  }


  async verificationEmailFirebase(): Promise<void> {
    try {
      return (await this.afAuth.auth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log(this.errorVerificationEmailFireBase, error);
    }
  }


  async logOut(): Promise<void> {
    await this.afAuth.auth.signOut().then(res => {
      sessionStorage.removeItem("usuario");
      this.redirect(this.paginaLogin);
    }).catch(error => {
      console.log(error);
      this.redirect(this.logOutError);
    });

  }

  public redirect(router: string): void {
    this.router.navigate([router]);
  }
}
