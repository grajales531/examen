import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { BlueEyesComponent } from './components/blue-eyes/blue-eyes.component';

@Component({ selector: 'app-root', standalone: true, imports: [SearchComponent, BlueEyesComponent],
  template: `<main><h1>Blue-Eyes Card Explorer</h1>
    <nav><button (click)="section = 'search'">Buscador</button>
    <button (click)="section = 'blue-eyes'">Blue-Eyes Collection</button></nav>
    @if (section === 'search') { <app-search /> } @else { <app-blue-eyes /> }
    <footer>Ángel Eduardo Santiago Grajales · Adrián Fernando Rosado Couoh</footer></main>` })
export class AppComponent { section: 'search' | 'blue-eyes' = 'search'; }
