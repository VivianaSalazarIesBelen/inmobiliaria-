import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DetailsComponent } from './details/details';
import { HousingLocationFormComponent } from './housing-location-form/housing-location-form';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'new',
    component: HousingLocationFormComponent
  }
];
