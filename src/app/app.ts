import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FavoritesService } from './favorites';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <header class="brand-name">

        <a routerLink="/">
          <img class="brand-logo"
               src="/logo-houses.png"
               alt="logo"
               aria-hidden="true">
        </a>

        <nav class="nav-links">
          <a routerLink="/favorites" class="fav-link">
            ❤️ {{ favoritesCount() }} favoritos
          </a>

          <a routerLink="/new" class="add-link">
            + Añadir vivienda
          </a>
        </nav>

      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  private favoritesService = inject(FavoritesService);

  // contador reactivo
  favoritesCount = () =>
    this.favoritesService.favoritesList()().length;
}
