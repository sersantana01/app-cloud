(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{FSnT:function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){},a=e("pMnS"),o=e("tq4q"),i=e("Twlg"),s=e("EVdn"),r=function(){function l(l,n){this.datataSharedService=l,this.maps=n,this.someValue="xxxx",this.progress=0}return l.prototype.ngOnInit=function(){var l=this;console.log("YOUE ARE IN GOOGLE"),this.maps.initMap();var n=this.datataSharedService.buscarUltimoEvento();console.log(n),console.log(null!=n&&null!=n.denunciante.latitudDenunciante),null!=n&&null!=n.denunciante.latitudDenunciante&&this.maps.setGoogleUbicacion(n.denunciante.latitudDenunciante,n.denunciante.longitudDenunciante),null!=n&&null!=n.latitud&&this.maps.setGoogleUbicacionEvento(n.latitud,n.longitud),this.subscriptionDatos=this.datataSharedService.datosLlamadaObservable$.subscribe(function(n){console.log("UBICACION GOOGLE   "),console.log(n);var e=n.listaEventos[n.listaEventos.length-1];console.log("?????"+(void 0==e.idEvento||null==e.idEvento||""==e.idEvento)),void 0!=e.idEvento&&null!=e.idEvento&&""!=e.idEvento||l.maps.setGoogleUbicacion(e.denunciante.latitudDenunciante,e.denunciante.longitudDenunciante)}),this.subscriptionCenterUbicacion=this.datataSharedService.ubicacionActualObservable$.subscribe(function(l){"0"==l.latitud&&"0"==l.longitud&&(console.log("RESETING TO 0 0 "),console.log(l))})},l.prototype.sendLocation=function(){var l=s("#lat").val(),n=s("#long").val(),e=s("#zp").val();""!=l&&""!=n&&(this.datataSharedService.setUbicacionLlamada(l,n,e),s("#lat").val(""),s("#long").val(""))},l}(),c=u["\u0275crt"]({encapsulation:0,styles:[".mapControls[_ngcontent-%COMP%] {\n        margin-top: 10px;\n        border: 1px solid transparent;\n        border-radius: 2px 0 0 2px;\n        box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        height: 32px;\n        outline: none;\n        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\n    }\n    #searchMapInput[_ngcontent-%COMP%] {\n        background-color: #fff;\n        font-family: Roboto;\n        font-size: 15px;\n        font-weight: 300;\n        margin-left: 12px;\n        padding: 0 11px 0 13px;\n        text-overflow: ellipsis;\n        width: 50%;\n        z-index: 3;\n        position:absolute;\n        display:block;\n        top: 100px;\n    }\n\n    #searchMapInput[_ngcontent-%COMP%]:focus {\n        border-color: #4d90fe;\n    }"],data:{}});function d(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"input",[["class","mapControls"],["id","searchMapInput"],["placeholder","Ingrese direcci\xf3n"],["type","text"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,0,"div",[["id","map"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Progress: %"])),(l()(),u["\u0275eld"](4,0,null,null,0,"input",[["id","lat"],["type","text"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,0,"input",[["id","long"],["type","text"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,0,"button",[["id","btn_location"]],[[8,"hidden",0]],[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.sendLocation()&&u),u},null,null))],null,function(l,n){l(n,4,0,!0),l(n,5,0,!0),l(n,6,0,!0)})}var p=u["\u0275ccf"]("app-fullscreen-map-cmp",r,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-fullscreen-map-cmp",[],null,null,null,d,c)),u["\u0275did"](1,114688,null,0,r,[o.a,i.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),m=function(){function l(){}return l.prototype.ngOnInit=function(){var l=new google.maps.LatLng(19.434522,-99.176824),n={zoom:8,center:l,scrollwheel:!1},e=new google.maps.Map(document.getElementById("regularMap"),n),u=new google.maps.Marker({position:l,title:"Regular Map!"});u.setMap(e);var t={zoom:13,center:l=new google.maps.LatLng(19.434522,-99.176824),scrollwheel:!1,disableDefaultUI:!0,zoomControl:!0,styles:[{featureType:"water",stylers:[{saturation:43},{lightness:-11},{hue:"#0088ff"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{hue:"#ff0000"},{saturation:-100},{lightness:99}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#808080"},{lightness:54}]},{featureType:"landscape.man_made",elementType:"geometry.fill",stylers:[{color:"#ece2d9"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#ccdca1"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#767676"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#b8cb93"}]},{featureType:"poi.park",stylers:[{visibility:"on"}]},{featureType:"poi.sports_complex",stylers:[{visibility:"on"}]},{featureType:"poi.medical",stylers:[{visibility:"on"}]},{featureType:"poi.business",stylers:[{visibility:"simplified"}]}]};e=new google.maps.Map(document.getElementById("customSkinMap"),t),(u=new google.maps.Marker({position:l,title:"Custom Skin & Settings Map!"})).setMap(e);var a={zoom:3,scrollwheel:!1,center:l=new google.maps.LatLng(19.434522,-99.176824),mapTypeId:google.maps.MapTypeId.SATELLITE};e=new google.maps.Map(document.getElementById("satelliteMap"),a),(u=new google.maps.Marker({position:l,title:"Satellite Map!"})).setMap(e)},l}(),g=u["\u0275crt"]({encapsulation:2,styles:[],data:{}});function f(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,26,"div",[["class","main-content"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,25,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,24,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,7,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,6,"div",[["class","card"]],null,null,null,null,null)),(l()(),u["\u0275eld"](5,0,null,null,3,"div",[["class","card-header card-header-text card-header-rose"]],null,null,null,null,null)),(l()(),u["\u0275eld"](6,0,null,null,2,"div",[["class","card-text"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Satellite Map"])),(l()(),u["\u0275eld"](9,0,null,null,1,"div",[["class","card-content"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,0,"div",[["class","map map-big"],["id","satelliteMap"]],null,null,null,null,null)),(l()(),u["\u0275eld"](11,0,null,null,7,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](12,0,null,null,6,"div",[["class","card"]],null,null,null,null,null)),(l()(),u["\u0275eld"](13,0,null,null,3,"div",[["class","card-header card-header-text card-header-rose"]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,2,"div",[["class","card-text"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Regular Map"])),(l()(),u["\u0275eld"](17,0,null,null,1,"div",[["class","card-content"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,0,"div",[["class","map"],["id","regularMap"]],null,null,null,null,null)),(l()(),u["\u0275eld"](19,0,null,null,7,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](20,0,null,null,6,"div",[["class","card"]],null,null,null,null,null)),(l()(),u["\u0275eld"](21,0,null,null,3,"div",[["class","card-header card-header-text card-header-rose"]],null,null,null,null,null)),(l()(),u["\u0275eld"](22,0,null,null,2,"div",[["class","card-text"]],null,null,null,null,null)),(l()(),u["\u0275eld"](23,0,null,null,1,"h4",[["class","card-title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Custom Skin & Settings Map"])),(l()(),u["\u0275eld"](25,0,null,null,1,"div",[["class","card-content"]],null,null,null,null,null)),(l()(),u["\u0275eld"](26,0,null,null,0,"div",[["class","map"],["id","customSkinMap"]],null,null,null,null,null))],null,null)}var v=u["\u0275ccf"]("app-vector-maps-cmp",m,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-vector-maps-cmp",[],null,null,null,f,g)),u["\u0275did"](1,114688,null,0,m,[],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),h=function(){function l(){}return l.prototype.ngOnInit=function(){},l.prototype.setMapCenter=function(){console.log("SET SRC");var l="https://www.maptiler.com/maps/#topo/vector/vector/10.27/"+this.randomIntFromInterval(-90,90)+"/"+this.randomIntFromInterval(-90,90);console.log("SET SRC:"+l),$("#myFrameSiga").prop("src","https://cdn-images-1.medium.com/max/1600/0*4Gzjgh9Y7Gu8KEtZ.gif"),setTimeout(function(){$("#myFrameSiga").prop("src",l)},1500)},l.prototype.randomIntFromInterval=function(l,n){return Math.floor(Math.random()*(n-l+1)+l)},l}(),y=u["\u0275crt"]({encapsulation:2,styles:[],data:{}});function b(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[["class","envolventeMapaHtml"],["id","map"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,0,"iframe",[["id","myFrameSiga"],["style","width: 100%;height: 100%;"]],null,null,null,null,null))],null,null)}var M=u["\u0275ccf"]("app-vector-maps-cmp",h,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-vector-maps-cmp",[],null,null,null,b,y)),u["\u0275did"](1,114688,null,0,h,[],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),x=e("Ip0R"),T=e("gIcY"),w=e("ZYCi");e.d(n,"MapsModuleNgFactory",function(){return S});var S=u["\u0275cmf"](t,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[a.a,p,v,M]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,x.o,x.n,[u.LOCALE_ID,[2,x.D]]),u["\u0275mpd"](4608,T["\u0275angular_packages_forms_forms_j"],T["\u0275angular_packages_forms_forms_j"],[]),u["\u0275mpd"](1073742336,x.c,x.c,[]),u["\u0275mpd"](1073742336,w.p,w.p,[[2,w.v],[2,w.m]]),u["\u0275mpd"](1073742336,T["\u0275angular_packages_forms_forms_bc"],T["\u0275angular_packages_forms_forms_bc"],[]),u["\u0275mpd"](1073742336,T.FormsModule,T.FormsModule,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,w.k,function(){return[[{path:"",children:[{path:"googlemaps",component:r}]},{path:"",children:[{path:"otro",component:m}]},{path:"",children:[{path:"siga",component:h}]}]]},[])])})}}]);