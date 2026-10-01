import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { BlueEyesComponent } from './components/blue-eyes/blue-eyes.component';

@Component({ selector: 'app-root', standalone: true, imports: [SearchComponent, BlueEyesComponent],
  template: `<main>
    <header class="hero">
      <div class="hero-mark" aria-hidden="true">✦</div>
      <div>
        <p class="eyebrow">Explorador de cartas · Yu-Gi-Oh!</p>
        <h1>Blue-Eyes <span>Card Explorer</span></h1>
        <p class="hero-copy">Busca cartas, consulta sus datos y descubre la colección Blue-Eyes y sus expansiones.</p>
      </div>
    </header>
    <nav aria-label="Secciones principales">
      <button type="button" [class.active]="section === 'search'" [attr.aria-current]="section === 'search' ? 'page' : null" (click)="section = 'search'">Buscador</button>
      <button type="button" [class.active]="section === 'blue-eyes'" [attr.aria-current]="section === 'blue-eyes' ? 'page' : null" (click)="section = 'blue-eyes'">Blue-Eyes Collection</button>
    </nav>
    @if (section === 'search') { <app-search /> } @else { <app-blue-eyes /> }
    <footer>Ángel Eduardo Santiago Grajales · Adrián Fernando Rosado Couoh</footer>
  </main>` })
export class AppComponent { section: 'search' | 'blue-eyes' = 'search'; }
