import { Component, inject, OnInit, signal } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location';
import { HousingService } from '../housing';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>

    <section class="results">
      @for (location of filteredLocationList(); track location.id) {
        <app-housing-location [housingLocation]="location"></app-housing-location>
      } @empty {
        <p>No se encontraron viviendas disponibles.</p>
      }
    </section>
  `,
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private housingService = inject(HousingService);

  // Usamos Signals para manejar el estado reactivo de la lista
  // housingLocationList = lista completa; filteredLocationList = lo que se muestra
  housingLocationList = signal<HousingLocation[]>([]);
  filteredLocationList = signal<HousingLocation[]>([]);

  ngOnInit(): void {
    // Nos suscribimos al servicio HTTP que lee de json-server
    this.housingService.getAllHousingLocations().subscribe({
      next: (locations) => {
        this.housingLocationList.set(locations);
        this.filteredLocationList.set(locations);
      },
      error: (err) => console.error('Error al cargar las viviendas:', err)
    });
  }

  // Filtra por ciudad (sin distinguir mayúsculas y por coincidencia parcial)
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList());
      return;
    }

    const q = text.toLowerCase();
    this.filteredLocationList.set(
      this.housingLocationList().filter(l => l.city.toLowerCase().includes(q))
    );
  }
}
