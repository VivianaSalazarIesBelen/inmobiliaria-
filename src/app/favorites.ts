import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private favorites = signal<string[]>(this.loadFromStorage());

  private loadFromStorage(): string[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  private save() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites()));
  }

  isFavorite(id: any): boolean {
    return this.favorites().includes(String(id));
  }

  toggle(id: any) {
    const idStr = String(id);
    if (this.isFavorite(idStr)) {
      this.favorites.set(this.favorites().filter(f => f !== idStr));
    } else {
      this.favorites.set([...this.favorites(), idStr]);
    }
    this.save();
  }

  favoritesList() {
    return this.favorites;
  }
}
