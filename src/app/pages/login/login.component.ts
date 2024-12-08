import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { User } from 'src/app/models/user';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser:User;
  constructor(private service:SecurityService, private router:Router) {
    this.theUser={email:"",password:""}
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    this.service.login(this.theUser).subscribe({
      next:(data)=>{
        this.service.saveSession(data)
        this.router.navigate(["dashboard"])
      },
      error:(error)=>{
        Swal.fire("autenticacion invalida","usuario o contraseña invalido","error")
      }
    })
  }

}
