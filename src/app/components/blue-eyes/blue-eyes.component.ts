import { Component } from '@angular/core';

// Adrián: cargar getBlueEyes(), deduplicar expansiones con Set y filtrar con some.
// Usar <app-card [card]="card" (selected)="selectedCard = $event"> para seleccionar.
// Usar <app-card-detail [card]="selectedCard"> para mostrar el detalle.
@Component({ selector: 'app-blue-eyes', standalone: true,
  templateUrl: './blue-eyes.component.html' })
export class BlueEyesComponent {}
