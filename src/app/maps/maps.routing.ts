import { Routes } from '@angular/router';

import { FullScreenMapsComponent } from './fullscreenmap/fullscreenmap.component';
import { GoogleMapsComponent } from './googlemaps/googlemaps.component';
import { VectorMapsComponent } from './vectormaps/vectormaps.component';

export const MapsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'googlemaps',
        component: FullScreenMapsComponent
    }]
    }, {
    path: '',
    children: [ {
      path: 'otro',
      component: GoogleMapsComponent
    }]
    }, {
      path: '',
      children: [ {
        path: 'siga',
        component: VectorMapsComponent
        }]
    }
];
