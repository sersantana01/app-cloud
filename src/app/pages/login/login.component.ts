import { Component, OnInit, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Usuario } from './usuario';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from '../../notificacion/notificacion.service';
declare var $: any;

declare global {
  interface Window {
    RTCPeerConnection: RTCPeerConnection;
    mozRTCPeerConnection: RTCPeerConnection;
    webkitRTCPeerConnection: RTCPeerConnection;
  }
}

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

  localIp = "";
  private ipRegex = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;


    usuario:Usuario;

    constructor(private element: ElementRef,  
                private authService: AuthService, 
                private router: Router, 
                private notificacion : NotificacionService,
                private zone: NgZone) {

        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

        this.usuario = new Usuario();
      
    }







    login(): void {
        console.log(this.usuario);
     
        if( this.usuario.username == null || this.usuario.password == null){
            
        /// swal.fire('Error', 'USername o password  vacios', 'error' );
        this.notificacion.showNotification('top','center', 'usuario o contraseña vacios','danger' );
 
         return;
        }
     
        this.authService.loginORDS(this.usuario).subscribe(response =>{
     
           let playLoad = JSON.parse(atob((response.access_token.split(".")[1]) ) ) ;
         console.log ( playLoad);
     
     
         this.authService.guardarUsuario(response.access_token);
         this.authService.guardarToken(response.access_token);
        let username= this.authService.getUsuario.username;
     

          if(username.toUpperCase() == 'LUIS'){
            this.router.navigate(['dashboard']);
          }else{
            this.router.navigate(['']);
          }
     
      
       //  swal.fire('Login', `Hola ${username}, has iniciado sesión con éxito!`, 'success');
     
        }, error =>{
     
           if(error.status == 400){
            this.notificacion.showNotification('top','center', 'Usuario o contraseñas incorrectas!','danger' );
           //  swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
           }else if(error.status == 401) {
            this.notificacion.showNotification('top','center', 'Usuario o contraseñas incorrectas!', 'danger');
             //swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
           }
        }
     
             );
     
       }







    ngOnInit() {
      this.determineLocalIp();
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }



    private determineLocalIp() {
      window.RTCPeerConnection = this.getRTCPeerConnection();
  
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      pc.createOffer().then(pc.setLocalDescription.bind(pc));
  
      pc.onicecandidate = (ice) => {
        this.zone.run(() => {
          if (!ice || !ice.candidate || !ice.candidate.candidate) {
            return;
          }
  
          this.localIp = this.ipRegex.exec(ice.candidate.candidate)[1];
          localStorage.setItem('LOCAL_IP', this.localIp);
  
          pc.onicecandidate = () => {};
          pc.close();
        });
      };
    }
  
    private getRTCPeerConnection() {
      return window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
    }

}
