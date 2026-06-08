import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

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
        <a routerLink="/new" class="add-link">+ Añadir vivienda</a>
      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'homes';
}
