import { Component } from '@angular/core';

// Ángel: implementar búsqueda con debounceTime, distinctUntilChanged y switchMap; mostrar estados.
// Usar <app-card [card]="card" (selected)="selectedCard = $event"> para seleccionar.
// Usar <app-card-detail [card]="selectedCard"> para mostrar el detalle.
@Component({ selector: 'app-search', standalone: true,
  templateUrl: './search.component.html' })
export class SearchComponent {}
