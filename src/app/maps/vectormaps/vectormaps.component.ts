// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation

import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-vector-maps-cmp',
    templateUrl: './vectormaps.component.html'
})

export class VectorMapsComponent implements OnInit {
    ngOnInit() {
        this.setMapCenter();
    }



    public setMapCenter(){
    
        console.log("SET SRC");
    
        let latitud=this.randomIntFromInterval(-90,90);
        let longitud=this.randomIntFromInterval(-90,90);
    
        let mapa="https://www.maptiler.com/maps/#topo/vector/vector/10.27/"+latitud+"/"+longitud;
    
        let url1="http://192.168.10.80:8082/siga/siga.html?idEvento=485&amp;idSesion=76&amp;longitud=-70.57237084955&amp;latitud=-33.388447600743&amp;numExterior=&amp;idInstitucion=1&amp;idSistemaGeoAlerta=33"  
     
     
    
        console.log("SET SRC:"+mapa);
        $('#myFrameSiga').prop('src','https://cdn-images-1.medium.com/max/1600/0*4Gzjgh9Y7Gu8KEtZ.gif');
     
    
        setTimeout (() => { 
          $('#myFrameSiga').prop('src',mapa );
        }, 1500)
     
       
      }

      randomIntFromInterval(min,max)     {
        return Math.floor(Math.random()*(max-min+1)+min);
        }

}