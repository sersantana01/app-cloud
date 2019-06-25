import { Injectable } from '@angular/core';
declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}


@Injectable({
 providedIn: 'root'
})
export class GoogleMapService {

  
 someValue:String = 'xxxx';
 progress: number = 0;
 label: string;

 map:any;

 constructor() { }


 public initMap(){
   const myLatlng = new google.maps.LatLng(19.434522, -99.176824);
   const mapOptions = {
       zoom: 13,
       center: myLatlng,
       gestureHandling: 'auto',
   
       scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
       styles: [
         {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
         {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
         {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
         {
           featureType: 'administrative.locality',
           elementType: 'labels.text.fill',
           stylers: [{color: '#d59563'}]
         },
         {
           featureType: 'poi',
           elementType: 'labels.text.fill',
           stylers: [{color: '#d59563'}]
         },
         {
           featureType: 'poi.park',
           elementType: 'geometry',
           stylers: [{color: '#263c3f'}]
         },
         {
           featureType: 'poi.park',
           elementType: 'labels.text.fill',
           stylers: [{color: '#6b9a76'}]
         },
         {
           featureType: 'road',
           elementType: 'geometry',
           stylers: [{color: '#38414e'}]
         },
         {
           featureType: 'road',
           elementType: 'geometry.stroke',
           stylers: [{color: '#212a37'}]
         },
         {
           featureType: 'road',
           elementType: 'labels.text.fill',
           stylers: [{color: '#9ca5b3'}]
         },
         {
           featureType: 'road.highway',
           elementType: 'geometry',
           stylers: [{color: '#746855'}]
         },
         {
           featureType: 'road.highway',
           elementType: 'geometry.stroke',
           stylers: [{color: '#1f2835'}]
         },
         {
           featureType: 'road.highway',
           elementType: 'labels.text.fill',
           stylers: [{color: '#f3d19c'}]
         },
         {
           featureType: 'transit',
           elementType: 'geometry',
           stylers: [{color: '#2f3948'}]
         },
         {
           featureType: 'transit.station',
           elementType: 'labels.text.fill',
           stylers: [{color: '#d59563'}]
         },
         {
           featureType: 'water',
           elementType: 'geometry',
           stylers: [{color: '#17263c'}]
         },
         {
           featureType: 'water',
           elementType: 'labels.text.fill',
           stylers: [{color: '#515c6d'}]
         },
         {
           featureType: 'water',
           elementType: 'labels.text.stroke',
           stylers: [{color: '#17263c'}]
         }
       ]
       // styles: [
       //     {'featureType': 'water', 'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]},
       //     {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'hue': '#ff0000'},
       //     {'saturation': -100}, {'lightness': 99}]},
       //     {'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#808080'},
       //     {'lightness': 54}]},
       //     {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ece2d9'}]},
       //     {'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ccdca1'}]},
       //     {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#767676'}]},
       //     {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]},
       //     {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]},
       //     {'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'},
       //     {'color': '#b8cb93'}]},
       //     {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]},
       //     {'featureType': 'poi.sports_complex', 'stylers': [{'visibility': 'on'}]},
       //     {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]},
       //     {'featureType': 'poi.business', 'stylers': [{'visibility': 'simplified'}]}
       // ]
   };




   this. map = new google.maps.Map(document.getElementById('map'), mapOptions);


  // const Marker = new google.maps.Marker({
  //     position: myLatlng,
   //    title: 'Hello World!'
   //});
// To add the marker to the map, call setMap();
//Marker.setMap(map);

var input = document.getElementById('searchMapInput');
this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds',   this.map);

var infowindow = new google.maps.InfoWindow();

var marker2 = new google.maps.Marker({
   map:  this. map,
   draggable: true,
   animation: google.maps.Animation.BOUNCE,
   anchorPoint: new google.maps.Point(0, -29)
});



// map.data.loadGeoJson(
//   'http://github.com/sersantana01/IntegracionesMicrosServices/blob/master/zona_patrullaje_cdmx.geojson');

//   map.data.setStyle({
//     fillColor: 'green',
//     strokeWeight: 1
//   });

// var trafficLayer = new google.maps.TrafficLayer();
// trafficLayer.setMap(map);
   
autocomplete.setComponentRestrictions ({ 'country' : [ 'mx' ]}, { 'city' : [ 'Mexico City' ]} );

console.log("11");

autocomplete.addListener('place_changed', function() {
   infowindow.close();
   marker2.setVisible(false);
   var place = autocomplete.getPlace();

   /* If the place has a geometry, then present it on a map. */
   if (place.geometry.viewport) {
       this. map.fitBounds(place.geometry.viewport);
   } else {
       this. map.setCenter(place.geometry.location);
       this. map.setZoom(17);
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
   infowindow.open(  this.map, marker2);
  
   /* Location details */
 ///  document.getElementById('location-snap').innerHTML = place.formatted_address;
  // document.getElementById('lat-span').innerHTML = place.geometry.location.lat();
  // document.getElementById('lon-span').innerHTML = place.geometry.location.lng();
   document.getElementById('searchMapInput').innerHTML=place.geometry.location.lat();

 //  console.log(place.geometry.location.lat());
 

   $("#lat").val(place.geometry.location.lat());
   $("#long").val(place.geometry.location.lng());
   $("#btn_location").click();

});





 // Este detector de eventos llama a  mueve el Marker () cuando se hace doble clic en el mapa.
google.maps.event.addListener (  this.map, 'click', function (e) {
 // addMarker (e.latLng, map);

 infowindow.close();
  marker2.setVisible(false);
  marker2.setPosition(e.latLng);
  marker2.setVisible(true);

  var latLng = e.latLng;  

  console.log("333");
  $("#lat").val(latLng.lat());
  $("#long").val(latLng.lng());
  $("#btn_location").click();


});



google.maps.event.addListener(marker2, 'dragend', function(marker) {


   var latLng = marker.latLng;

   infowindow.close();
  
  // document.getElementById('lat-span').innerHTML = latLng.lat();
   //document.getElementById('lon-span').innerHTML = latLng.lng();


  
console.log("444");
 // this.notificarDataSharedService(latLng.lat(),latLng.lng()  );


 $("#lat").val(latLng.lat());
 $("#long").val(latLng.lng());


$("#btn_location").click()

});




}






public setGoogleUbicacion(latitud, longitud ){

 const myLatlng = new google.maps.LatLng(latitud, longitud);

// const map = new google.maps.Map(document.getElementById('map'), mapOptions);

 // this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

 var infowindow = new google.maps.InfoWindow({
     content: "Denunciante"
   });


 this. map.setZoom(17);
 this. map.setCenter(myLatlng);
 var marker2 = new google.maps.Marker({
     map: this.map,position: myLatlng,
     draggable: false,
     title: 'Denunciante ubicacion',
     icon:"https://img.icons8.com/ultraviolet/45/000000/street-view.png",
     animation: google.maps.Animation.DROP,
     anchorPoint: new google.maps.Point(0, -29)
 });
 marker2.addListener('click', function() {
     infowindow.open(this.map, marker2);
   });

}

public setGoogleUbicacionEvento(latitud, longitud ){

const myLatlng = new google.maps.LatLng(latitud, longitud);

// const map = new google.maps.Map(document.getElementById('map'), mapOptions);

// this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

var infowindow = new google.maps.InfoWindow({
   content: "Denunciante"
 });


this. map.setZoom(17);
this. map.setCenter(myLatlng);
var marker2 = new google.maps.Marker({
   map: this.map,position: myLatlng,
   draggable: false,
   title: 'Evento ubicacion',
   animation: google.maps.Animation.DROP,
   anchorPoint: new google.maps.Point(0, -29)
});
marker2.addListener('click', function() {
   infowindow.open(this.map, marker2);
 });

}


}



