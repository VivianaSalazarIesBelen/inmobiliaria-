export interface HousingLocation {
  id: number; // json-server gestiona los IDs como strings automáticamente
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
  // Nuevas propiedades añadidas por el Ejercicio (Punto 1):
  coordinate: {
    latitude: number;
    longitude: number;
  };
  price: number;
  available: boolean;
}
