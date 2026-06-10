import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation().photo" alt="Exterior de {{housingLocation().name}}">
      <button
        type="button"
        (click)="toggleFavorite($event)"
        class="fav-btn"
      >
        {{ isFavorite() ? '❤️' : '♡' }}
      </button>
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

  private favoritesService = inject(FavoritesService);

  toggleFavorite(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggle(this.housingLocation().id);
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.housingLocation().id);
  }
}
