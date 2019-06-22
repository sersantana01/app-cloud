import { Injectable, OnInit } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor() { }



  public   showNotification(from: any, align: any, msj : string ,msjType: string) {
    const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    const color = Math.floor((Math.random() * 6) + 1);

    $.notify({
        icon: 'notifications',
        message:msj      //'Welcome to <b>Material Dashboard</b> - a beautiful dashboard for every web developer.'
    }, {
        type: msjType,
        delay: 500,
        timer: 2000,
        placement: {
            from: from,
            align: align
        },
        template: '<div  data-notify="container" class="notificationMsg col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
ngOnInit(){
    var mainPanel = document.getElementsByClassName('main-panel')[0];
    $('.modal').on('shown.bs.modal', function () {
      mainPanel.classList.add('no-scroll');
    })
    $('.modal').on('hidden.bs.modal', function () {
      mainPanel.classList.remove('no-scroll');
    })
}
}

