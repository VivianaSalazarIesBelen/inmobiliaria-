import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../favorites';
import { ReviewComponent } from '../review/review';
import {
  ReactiveFormsModule,
  Validators,
  NonNullableFormBuilder
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HousingService } from '../housing';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReviewComponent],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private housingService = inject(HousingService);
  private fb = inject(NonNullableFormBuilder);


  // Signals: la app corre en modo zoneless (Angular 21), así que el estado
  // que se muestra en la plantilla debe ser reactivo para refrescar la vista.
  housingLocation = signal<HousingLocation | undefined>(undefined);

  // Clima actual de la vivienda (Punto 4 del ejercicio)
  weather = signal<any | undefined>(undefined);

  private houseId: string | null = null;


  applyForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    // 🔹 Cargar vivienda por ID de la ruta
    this.route.paramMap.subscribe((params) => {
      this.houseId = params.get('id');

      const id = Number(params.get('id'));

      this.housingService.getHousingLocationById(id).subscribe((location) => {
        this.housingLocation.set(location);

        // 🔹 Con las coordenadas de la vivienda, pedir el clima (Punto 4)
        const { latitude, longitude } = location.coordinate;
        this.housingService.getWeather(latitude, longitude).subscribe({
          next: (data) => this.weather.set(data),
          error: (err) => console.error('Error al cargar el clima:', err),
        });
      });
      this.applyForm.reset();

      if (this.houseId) {
        // Creamos una clave única por cada ID, por ejemplo: "applicationData_2"
        const savedData = localStorage.getItem(`applicationData_${this.houseId}`);
        if (savedData) {
          this.applyForm.patchValue(JSON.parse(savedData));
        }
      }
    });
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    if (this.houseId) {
      localStorage.setItem(
        `applicationData_${this.houseId}`, // <-- Clave dinámica por casa
        JSON.stringify(this.applyForm.getRawValue()),
      );
      alert(
        `Solicitud enviada y guardada en localStorage para la casa número ${this.houseId}`,
      );
    }
  }

  get reviewsSorted() {
    return (this.housingLocation()?.reviews ?? [])
      .slice()
      .sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }

  private favoritesService = inject(FavoritesService);

  toggleFavorite() {
    const house = this.housingLocation();
    if (!house) return;
    this.favoritesService.toggle(house.id);
  }

  isFavorite(): boolean {
    const house = this.housingLocation();
    return house ? this.favoritesService.isFavorite(house.id) : false;
  }
}
