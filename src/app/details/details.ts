import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
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

  applyForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit(): void {

    // 🔹 Cargar vivienda por ID de la ruta
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.housingService.getHousingLocationById(id)
        .subscribe(location => {
          this.housingLocation.set(location);

          // 🔹 Con las coordenadas de la vivienda, pedir el clima (Punto 4)
          const { latitude, longitude } = location.coordinate;
          this.housingService.getWeather(latitude, longitude)
            .subscribe({
              next: data => this.weather.set(data),
              error: err => console.error('Error al cargar el clima:', err)
            });
        });
    });

    // 🔹 Cargar datos guardados en localStorage
    const savedData = localStorage.getItem('applicationData');

    if (savedData) {
      this.applyForm.patchValue(JSON.parse(savedData));
    }
  }

  submitApplication() {

    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    // 🔹 Guardar en localStorage
    localStorage.setItem(
      'applicationData',
      JSON.stringify(this.applyForm.getRawValue())
    );

    alert('Solicitud enviada y guardada en localStorage');
  }
}
