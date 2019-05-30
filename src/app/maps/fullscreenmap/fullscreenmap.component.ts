import {Component, OnInit, NgZone } from '@angular/core';
import   {DataSharedService}    from '../../shared/services/data-shared.service'

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
    selector: 'app-fullscreen-map-cmp',
    templateUrl: 'fullscreenmap.component.html'
})

export class FullScreenMapsComponent implements OnInit {
    
   

    constructor(private datataSharedService : DataSharedService , private _ngZone: NgZone){
  
        window['angularComponentRef'] = {component: this, zone: _ngZone};
    }
    ngOnInit() {

     this.demo();
    }



    public demo(){
        const myLatlng = new google.maps.LatLng(19.434522, -99.176824);
        const mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [
                {'featureType': 'water', 'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]},
                {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'hue': '#ff0000'},
                {'saturation': -100}, {'lightness': 99}]},
                {'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#808080'},
                {'lightness': 54}]},
                {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ece2d9'}]},
                {'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ccdca1'}]},
                {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#767676'}]},
                {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]},
                {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]},
                {'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'},
                {'color': '#b8cb93'}]},
                {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]},
                {'featureType': 'poi.sports_complex', 'stylers': [{'visibility': 'on'}]},
                {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]},
                {'featureType': 'poi.business', 'stylers': [{'visibility': 'simplified'}]}
            ]
        };

    


        const map = new google.maps.Map(document.getElementById('map'), mapOptions);


       // const Marker = new google.maps.Marker({
       //     position: myLatlng,
        //    title: 'Hello World!'
        //});
    // To add the marker to the map, call setMap();
    //Marker.setMap(map);

    var input = document.getElementById('searchMapInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();

    var marker2 = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.BOUNCE,
        anchorPoint: new google.maps.Point(0, -29)
    });


    autocomplete.setComponentRestrictions ({ 'country' : [ 'mx' ]}, { 'city' : [ 'Mexico City' ]} ); 



    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker2.setVisible(false);
        var place = autocomplete.getPlace();
    
        /* If the place has a geometry, then present it on a map. */
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker2.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker2.setPosition(place.geometry.location);
        marker2.setVisible(true);
      
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
      
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker2);
        
        /* Location details */
      ///  document.getElementById('location-snap').innerHTML = place.formatted_address;
       // document.getElementById('lat-span').innerHTML = place.geometry.location.lat();
       // document.getElementById('lon-span').innerHTML = place.geometry.location.lng();

      

        document.getElementById('searchMapInput').innerHTML=place.geometry.location.lat();


        this._ngZone.run(() => {
            this.notificarDataSharedService(place.geometry.location.lat(), place.geometry.location.lng() );
        });
      

    
     
    });


    


      // Este detector de eventos llama a  mueve el Marker () cuando se hace doble clic en el mapa.
    google.maps.event.addListener (map, 'click', function (e) {
      // addMarker (e.latLng, map);

      infowindow.close();
       marker2.setVisible(false);
       marker2.setPosition(e.latLng);
       marker2.setVisible(true);
       var latLng = marker2.latLng;

    

       this.notificarDataSharedService(latLng.lat(),latLng.lng()  );
    });



    google.maps.event.addListener(marker2, 'dragend', function(marker) {
    

        var latLng = marker.latLng;

        infowindow.close();
        
       // document.getElementById('lat-span').innerHTML = latLng.lat();
        //document.getElementById('lon-span').innerHTML = latLng.lng();


        

       this.notificarDataSharedService(latLng.lat(),latLng.lng()  );
     });



 
    }


  public notificarDataSharedService ( long : any , lat : any){
        this.datataSharedService.setUbicacionLlamada( lat, long);

    }


  
}
