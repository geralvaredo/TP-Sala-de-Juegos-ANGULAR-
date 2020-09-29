import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../servicios/auth.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  errorLogout = "ErrorLogout->";

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  async onLogOut() {
    try {
      return await this.auth.logOut();
    } catch (error) {
      console.log(this.errorLogout, error);
    }
  }

}
