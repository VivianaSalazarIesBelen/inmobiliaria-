import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // inject() es la forma moderna de Angular 21 para la Inyección de Dependencias
  private http = inject(HttpClient);

  // URL de nuestro servidor de pruebas local (Lesson 14)
  private url = 'http://localhost:3000/locations';

  // URL e API KEY para el clima (Punto 4 del ejercicio)
  // NOTA: Reemplaza 'TU_API_KEY' por una real gratuita de weatherapi.com
  private weatherApiKey = '11464acbf6ec45388e8102306260406';

  // Obtener todas las casas del db.json
  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }

  // Añadir una nueva casa al db.json (Punto 6 del ejercicio)
  addHousingLocation(newHouse: Omit<HousingLocation, 'id'>): Observable<HousingLocation> {
    return this.http.post<HousingLocation>(this.url, newHouse);
  }

  // Consultar el clima actual usando latitud y longitud (Punto 4 del ejercicio)
  getWeather(lat: number, lon: number): Observable<any> {
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${this.weatherApiKey}&q=${lat},${lon}&lang=es`;
    return this.http.get<any>(weatherUrl);
  }
}
