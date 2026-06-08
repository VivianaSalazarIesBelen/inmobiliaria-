import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HousingService } from '../housing';

@Component({
  selector: 'app-housing-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './housing-location-form.html',
  styleUrl: './housing-location-form.css'
})
export class HousingLocationFormComponent {

  private fb = inject(NonNullableFormBuilder);
  private housingService = inject(HousingService);
  private router = inject(Router);

  // Signals: la app es zoneless, así que los mensajes que se muestran en la
  // plantilla y se actualizan dentro de callbacks deben ser signals.
  successMsg = signal('');
  errorMsg = signal('');
  submitting = signal(false);

  // Punto 6: formulario de alta de viviendas con sus validaciones
  form = this.fb.group({
    name:           ['', [Validators.required, Validators.minLength(3)]],
    city:           ['', Validators.required],
    state:          ['', Validators.required],
    availableUnits: [1,  [Validators.required, Validators.min(1)]],
    price:          [10000, [Validators.required, Validators.min(10000)]],
    wifi:           [false],
    laundry:        [false],
    available:      [true]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');

    // photo vacío y coordenadas por defecto (no se piden en este formulario).
    // El id lo asigna json-server automáticamente.
    const newHouse = {
      ...this.form.getRawValue(),
      photo: '',
      coordinate: { latitude: 0, longitude: 0 }
    };

    this.housingService.addHousingLocation(newHouse).subscribe({
      next: created => {
        this.successMsg.set(`Vivienda «${created.name}» creada (ID: ${created.id})`);
        this.submitting.set(false);
        this.form.reset({
          name: '',
          city: '',
          state: '',
          availableUnits: 1,
          price: 10000,
          wifi: false,
          laundry: false,
          available: true
        });

        // Redirigir al listado tras un momento (opcional del enunciado)
        setTimeout(() => this.router.navigate(['/']), 2000);
      },
      error: () => {
        this.errorMsg.set('Error al guardar. ¿Está json-server corriendo en el puerto 3000?');
        this.submitting.set(false);
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
