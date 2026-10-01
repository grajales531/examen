import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { Card, ViewState } from '../../models/card';
import { YugiohService } from '../../services/yugioh.service';
import { CardComponent } from '../card/card.component';
import { CardDetailComponent } from '../card-detail/card-detail.component';

interface SearchResult { state: ViewState; cards: Card[]; }

@Component({ selector: 'app-search', standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CardComponent, CardDetailComponent],
  templateUrl: './search.component.html' })
export class SearchComponent {
  private readonly api = inject(YugiohService);
  readonly name = new FormControl('', { nonNullable: true });
  selectedCard: Card | null = null;
  selectedExpansion = '';

  // Solo usamos las expansiones de las cartas devueltas por esta búsqueda.
  getExpansions(cards: Card[]): string[] {
    const names = cards.flatMap(card => card.card_sets?.map(set => set.set_name) ?? []);
    return [...new Set(names)].sort((first, second) => first.localeCompare(second));
  }

  getVisibleCards(cards: Card[]): Card[] {
    return this.selectedExpansion
      ? cards.filter(card => card.card_sets?.some(set => set.set_name === this.selectedExpansion))
      : cards;
  }

  onExpansionChange(event: Event): void {
    this.selectedExpansion = (event.target as HTMLSelectElement).value;
  }

  readonly result$ = this.name.valueChanges.pipe(
    startWith(''),
    map(name => name.trim()),
    // Esperamos una pausa al escribir y evitamos repetir la misma búsqueda.
    debounceTime(400),
    distinctUntilChanged(),
    // Al cambiar el nombre cancelamos la consulta anterior, evitando resultados atrasados.
    switchMap(name => {
      this.selectedCard = null;
      this.selectedExpansion = '';
      if (!name) return of<SearchResult>({ state: 'idle', cards: [] });
      return this.api.searchCards(name).pipe(
        map((cards): SearchResult => ({ state: cards.length ? 'success' : 'empty', cards })),
        startWith<SearchResult>({ state: 'loading', cards: [] }),
        // Capturamos dentro de switchMap: después de un error se puede seguir buscando.
        catchError(() => of<SearchResult>({ state: 'error', cards: [] }))
      );
    })
  );
}
