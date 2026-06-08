import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation().photo" alt="Exterior de {{housingLocation().name}}">
      <h2 class="listing-heading">{{ housingLocation().name }}</h2>
      <p class="listing-location">{{ housingLocation().city }}, {{ housingLocation().state }}</p>
      <p class="listing-price">Precio: \${{ housingLocation().price }}</p>
      <a [routerLink]="['/details', housingLocation().id]">Ver detalles</a>
    </section>
  `,
  styleUrl: './housing-location.css'
})
export class HousingLocationComponent {
  housingLocation = input.required<HousingLocation>();
}
