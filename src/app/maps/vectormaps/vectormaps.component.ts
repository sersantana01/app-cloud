// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-vector-maps-cmp',
    templateUrl: './vectormaps.component.html'
})

export class VectorMapsComponent implements OnInit {
    ngOnInit() {
        this.setMapCenter("19.4411109", "-99.1465073");
    }


    public setMapCenter(latitudX, longitudY){
    
      console.log("SET SRC");

      //////////////////////////////UBICACION DE SIGA///////////////////////////////////////////////////////////
      let latitud=latitudX
      let longitud=longitudY
   
      //let url=" http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&idSistemaGeoAlerta=9";
      let url="http://192.168.10.80:8082/siga/siga.html?idSesion=414&longitud="+longitud+"&latitud="+latitud+"&numExterior=&idInstitucion=1&idSistemaGeoAlerta=9&idSistema=1"


      console.log("SET SRC:"+url);
      
   //   setTimeout (() => { 
        $('#myFrameSiga').prop('src',url );
    //  }, 1500)
     //////////////////////////////UBICACION DE SIGA///////////////////////////////////////////////////////////
   
  
   }
 

}