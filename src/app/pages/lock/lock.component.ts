import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../../pages/login/auth.service'  ;
import { Router } from '@angular/router';

import { Usuario } from '../../pages/login/usuario';

@Component({
    selector: 'app-lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    auth:boolean=false;

     username: string;


    constructor(private authService: AuthService,   private router: Router){

    }
    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('lock-page');
      body.classList.add('off-canvas-sidebar');
      const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);

        this.username= this.authService.getUsuario.username ;

        if(this.authService.estaAutentificado  &&  this.username.toUpperCase() != 'LUIS'){
          this.auth=true;
      }else{
          this.auth=false;
      }
      
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('lock-page');
      body.classList.remove('off-canvas-sidebar');

    }



    login(): void {

      if(this.username.toUpperCase() != 'LUIS'){
        this.router.navigate(['']);
       
      }else{
        this.router.navigate(['dashboard']);
      }
    }
}
