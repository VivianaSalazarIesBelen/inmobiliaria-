import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location';
import { FavoritesService } from '../favorites';
import { HousingService } from '../housing';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent implements OnInit {

  private favoritesService = inject(FavoritesService);
  private housingService = inject(HousingService);

  favorites = signal<HousingLocation[]>([]);

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites() {
    this.housingService.getAllHousingLocations().subscribe(locations => {
      const favIds = this.favoritesService.favoritesList()();

      this.favorites.set(
        locations.filter(l => favIds.includes(String(l.id)))
      );
    });
  }

}
